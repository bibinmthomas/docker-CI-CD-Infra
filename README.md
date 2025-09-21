# Todo App

A full-stack todo application built with Next.js and MongoDB.

## Features

- ✅ Create new todos
- ✅ Mark todos as completed/incomplete  
- ✅ Edit todo titles inline
- ✅ Delete todos
- ✅ Real-time UI updates
- ✅ Responsive design with Tailwind CSS

## Setup

### Prerequisites

- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas account

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup MongoDB:**
   - **Option 1 - Local MongoDB:**
     - Install and start MongoDB locally
     - Update `.env.local`:
       ```env
       MONGODB_URI="mongodb://localhost:27017/todoapp"
       ```
   
   - **Option 2 - MongoDB Atlas (Cloud):**
     - Create a free account at [MongoDB Atlas](https://cloud.mongodb.com)
     - Create a new cluster and get your connection string
     - Update `.env.local`:
       ```env
       MONGODB_URI=""
       ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `GET /api/todos/[id]` - Get a specific todo
- `PUT /api/todos/[id]` - Update a todo
- `DELETE /api/todos/[id]` - Delete a todo

## Database Schema

```javascript
// MongoDB Collection: todos
{
  _id: ObjectId,
  title: String (required, max 255 chars),
  completed: Boolean (default: false),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-updated)
}
```

## Tech Stack

- **Frontend:** Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MongoDB with Mongoose ODM
- **Styling:** Tailwind CSS
