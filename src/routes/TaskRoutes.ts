import { Router } from "express";
import { IsAuthorized } from "../middlewares/Authorization";
import { CreateTask, GetTask } from "../controllers/TaskController";

const routes = Router();

routes.get("/task", IsAuthorized, GetTask);
routes.post("/task", IsAuthorized, CreateTask);

export default routes;
