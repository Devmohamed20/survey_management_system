import { Router } from "express";
import { register,login, logout , verifyEmail} from "../controller/authController.js";
import { validateRagisterInput,validationLoginInput } from "../middlewares/authValidation.js";

const route = Router();
route.post("/register",validateRagisterInput,register);
route.post("/login",validationLoginInput,login)
route.get("/logout",logout)
route.post("/verify-email")

export default route;

