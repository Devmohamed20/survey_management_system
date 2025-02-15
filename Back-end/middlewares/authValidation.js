import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import UserModel from "../models/UserModel.js";
import { verifyJwt } from "../utils/tokenUtils.js";

const withValidationError = (validation) => {
  return [
    validation,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorsMessage = errors.array().map((error) => error.msg);
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: errorsMessage });
      }
      next();
    },
  ];
};

export const validateRagisterInput = withValidationError([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("valid email is required")
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });
      if (user) {
        throw new Error("user already exist");
      }
    }),
  body("address").notEmpty().withMessage("address is required"),
  body("dateOfBirth").notEmpty().withMessage("date of birth is required"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be atleast 8 characters"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("confirm password is required")
    .isLength({ min: 8 })
    .withMessage("confirm password must be the same of password"),
]);

export const validationLoginInput = withValidationError([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("valid email is required")
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new Error("email is not found");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be atleast 8 characters"),
]);

export const authenticationToken = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "no token , unable to aunthenticate" });
  }
  try {
    const decoded = verifyJwt(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "there is authentication problem" });
  }
};
