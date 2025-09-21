import type _mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: typeof _mongoose | null;
    promise: Promise<typeof _mongoose> | null;
  };
}