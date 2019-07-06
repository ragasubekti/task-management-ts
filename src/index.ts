import express from "express";
import dotenv from "dotenv";

import Routes from "./routes";

dotenv.config();

const app = express();

// Express Middewares
app.use(express.json());

// Routes
app.use(Routes.UserRoutes);

const PORT = process.env.PORT || 6900;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
