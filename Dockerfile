# syntax = docker/dockerfile:1
FROM node:22-alpine AS base

ARG PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# Dependencies Stage
FROM base AS dependencies
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production && \
    cp -R node_modules /tmp/prod_node_modules && \
    npm ci --include=dev

# Builder Stage
FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Public build-time environment variables (customize as needed)
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN --mount=type=cache,target=/app/.next/cache \
    npm run build

# Production Runtime Stage
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=$PORT

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Create and set permissions for .next directory
RUN mkdir .next && chown nextjs:nodejs .next

# Copy production dependencies
COPY --from=dependencies /tmp/prod_node_modules ./node_modules

# Copy only necessary files from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE $PORT
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]