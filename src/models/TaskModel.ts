import mongoose from "../mongoose";
import { Schema, Document, Types } from "mongoose";
import { IUserModel } from "./UserModel";

const TaskSchema = new Schema(
  {
    name: String,
    description: String,
    dueDate: Date,
    isCompleted: Boolean,
    asignedTo: {
      type: Types.ObjectId,
      ref: "User"
    },
    creator: {
      type: Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export interface ITaskModel extends Document {
  name: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  assignedTo: IUserModel;
  creator: IUserModel;
  createdAt: string;
  updatedAt: string;
}

export default mongoose.model("Task", TaskSchema);
