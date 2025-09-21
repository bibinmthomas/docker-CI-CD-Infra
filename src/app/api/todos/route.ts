import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Todo from '@/models/Todo';
import { CreateTodoRequest } from '@/types/todo';

export async function GET() {
  try {
    await connectDB();
    
    const todos = await Todo.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 });
    
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { title }: CreateTodoRequest = await request.json();
    
    if (!title || title.trim() === '') {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const todo = new Todo({
      title: title.trim(),
    });

    const savedTodo = await todo.save();

    return NextResponse.json(savedTodo, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}