import * as mongoose from "mongoose";
import { Document, Model, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  date: Date;
}

const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

export const User = mongoose.model<User>("users", UserSchema);
