import mongoose from "../mongoose";
import { Schema, Document } from "mongoose";

const UserModelSchema = new Schema(
  {
    name: String,
    username: String,
    password: String,
    isManager: Boolean
  },
  { timestamps: true }
);

export interface IUserModel extends Document {
  _id: string;
  name: string;
  username: string;
  password: string;
  isManager: boolean;
  createdAt: string;
  updatedAt: string;
}

const UserModel = mongoose.model("User", UserModelSchema);

export default UserModel;
