import { Router } from "express";
import { IsAuthorized } from "../middlewares/Authorization";
import {
  CreateTask,
  GetTask,
  CompleteTask,
  UpdateTask,
  DeleteTask
} from "../controllers/TaskController";

const routes = Router();

routes.get("/task", IsAuthorized, GetTask);
routes.post("/task", IsAuthorized, CreateTask);
routes.put("/task/:id/complete", IsAuthorized, CompleteTask);
routes.put("/task/:id", IsAuthorized, UpdateTask);
routes.delete("/task/:id", IsAuthorized, DeleteTask);

export default routes;
