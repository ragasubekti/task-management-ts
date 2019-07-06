import { Router } from "express";
import { RegisterValidator } from "../validator/UserControllerValidator";
import { Register, Login } from "../controllers/UserController";

const routes = Router();

routes.post("/register", RegisterValidator, Register);
routes.post("/login", RegisterValidator, Login);

export default routes;
