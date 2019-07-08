import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import Routes from "./routes";

dotenv.config();

const app = express();

// Express Middewares
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV != "production") {
  app.use(morgan("dev"));
}

// Routes
app.use(Routes.UserRoutes);
app.use(Routes.TaskRoutes);

const PORT = process.env.PORT || 6900;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
