# syntax = docker/dockerfile:1

# Build stage - includes dev deps for building
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --frozen-lockfile

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1

# Public build-time environment variables
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN --mount=type=cache,target=/app/.next/cache \
    npm run build

# Production stage - ultra-minimal distroless runtime
FROM gcr.io/distroless/nodejs22-debian12:nonroot AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy only the bare minimum production files
# Next.js standalone includes all necessary node_modules
COPY --from=builder --chown=nonroot:nonroot /app/.next/standalone ./
COPY --from=builder --chown=nonroot:nonroot /app/.next/static ./.next/static
COPY --from=builder --chown=nonroot:nonroot /app/public ./public

EXPOSE 3000

CMD ["server.js"]