import { Router } from "express";
import { IsAuthorized } from "../middlewares/Authorization";
import { CreateTask } from "../controllers/TaskController";

const routes = Router();

routes.post("/task", IsAuthorized, CreateTask);

export default routes;
