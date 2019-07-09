import { Router } from "express";
import { RegisterValidator } from "../validator/UserControllerValidator";
import { Register, Login, SetupManager } from "../controllers/UserController";

const routes = Router();

routes.post("/register", RegisterValidator, Register);
routes.post("/login", RegisterValidator, Login);
routes.get("/first-setup/manager", SetupManager);

export default routes;
