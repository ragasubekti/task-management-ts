import { Router } from "express";
import { IsAuthorized } from "../middlewares/Authorization";
import {
  CreateTask,
  GetTask,
  CompleteTask
} from "../controllers/TaskController";

const routes = Router();

routes.get("/task", IsAuthorized, GetTask);
routes.post("/task", IsAuthorized, CreateTask);
routes.put("/task/:id/complete", IsAuthorized, CompleteTask);

export default routes;
