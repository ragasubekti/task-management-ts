import mongoose, { Schema } from "mongoose";

const UserModelSchema = new Schema({
  username: String,
  password: String,
  isManager: Boolean
});

const UserModel = mongoose.model("User", UserModelSchema);
