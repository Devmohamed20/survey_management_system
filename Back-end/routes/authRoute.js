import { Router } from "express";
import {
  register,
  login,
  logout,
  forgetPass,
  verifyOTPRegistration,
  verifyEmailForgetPassword,
  verifyOTPForgetPassword
} from "../controller/authController.js";
import {
  validateRagisterInput,
  validationLoginInput,
  authenticationToken,
} from "../middlewares/authValidation.js";

const route = Router();
route.post("/register", validateRagisterInput, register);
route.post("/register/verifyOTPRegistration", authenticationToken, verifyOTPRegistration);
route.post("/login", validationLoginInput, login);
route.get("/logout", logout);
route.post("/forget-password/verify-email-forget-password",verifyEmailForgetPassword);
route.post("/forget-password/verify-otp-forget-password", authenticationToken, verifyOTPForgetPassword);
route.post("/forget-password/update-password", authenticationToken, forgetPass);

export default route;
