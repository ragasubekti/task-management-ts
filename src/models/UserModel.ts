import mongoose from "../mongoose";
import { Schema } from "mongoose";

const UserModelSchema = new Schema({
  username: String,
  password: String,
  isManager: Boolean
});

const UserModel = mongoose.model("User", UserModelSchema);

export default UserModel;