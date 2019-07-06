import { Router } from "express";
import { RegisterValidator } from "../validator/UserControllerValidator";
import { Register } from "../controllers/UserController";

const routes = Router();

routes.post("/register", RegisterValidator, Register);

export default routes;
