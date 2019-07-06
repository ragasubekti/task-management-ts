import dotenv from "dotenv";
import mongoose from "mongoose";

// Initialize `dotenv`
dotenv.config();

const CONNECTION_STRING =
  process.env.MONGODB_URI || `mongodb://localhost:27017/taskManagement`;

// Connect to MongoDB Server
mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true
});

export default mongoose;
