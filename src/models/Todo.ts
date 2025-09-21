import mongoose from 'mongoose';

export interface ITodo extends mongoose.Document {
  title: string;
  completed: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [255, 'Title cannot exceed 255 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Todo || mongoose.model<ITodo>('Todo', TodoSchema);