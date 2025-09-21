'use client';

import { useState } from 'react';
import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, updates: { title?: string; completed?: boolean }) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = () => {
    if (editTitle.trim() !== todo.title) {
      onUpdate(todo._id, { title: editTitle.trim() });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    onUpdate(todo._id, { completed: !todo.completed });
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
      />
      
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
            className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-between">
          <span
            className={`${
              todo.completed
                ? 'text-gray-500 line-through'
                : 'text-gray-900'
            } cursor-pointer`}
            onClick={() => setIsEditing(true)}
          >
            {todo.title}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo._id)}
              className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}