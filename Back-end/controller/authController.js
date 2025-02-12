import statusCodes, { StatusCodes } from "http-status-codes";
import UserModel from "../models/UserModel.js";
import { hashPassword, comparePassword } from "../utils/hashingPassword.js";
import { createJwt } from "../utils/tokenUtils.js";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
//node mailer stuff

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ckgames044@gmail.com",
    pass: "qmsc dxxk vdws dfgg",
  },
});

// Test the transporter
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for messages");
    console.log(success);
  }
});
export const register = async (req, res) => {
  try {
    const date = new Date(req.body.dateOfBirth);
    const countUsers = await UserModel.countDocuments();

    countUsers === 0 ? (req.body.role = "user") : (req.body.role = "admin");
    req.body.role = "user";

    req.body.dateOfBirth = date;
    const passowrdHash = await hashPassword(req.body.password);

    req.body.password = passowrdHash;
    const data = req.body;

    // Generate a random 4-digit verification code
    const verificationCode = Math.floor(Math.random() * 9000 + 1000).toString();
    const hashVerfCode = await hashPassword(verificationCode);

    let mailOptions = {
      from: "ckgames044@gmail.com",
      to: req.body.email,
      subject: "Verify your email - OTP code",
      text: `your verification code is ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);

    // set isVerified to false
    req.body.isVerified = false;
    req.body.verificationCode = hashVerfCode;
    const token = createJwt({ email: req.body.email });
    const fiveMinute = 1000 * 60 * 5;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      expiresIn: new Date(Date.now() + fiveMinute),
    });
    const user = await UserModel.create(data);

    res.status(statusCodes.CREATED).json({
      msg: "Registration successful. Please check your email to verify your account.",
      verificationCode: verificationCode,
    });
  } catch (error) {
    console.log(error);
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "internal server error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { email } = req.user;

  const user = await findOne({ email });
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "unable to access" });
  }

  const { verificationCode } = user.verificationCode;

  const isMatch = await comparePassword(
    req.body.verificationCode,
    verificationCode
  );

  if (!isMatch) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "invalid verfication code" });
  }
  res.status(StatusCodes.OK).json({ msg: "now you can login" });
};

export const login = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await UserModel.findOne({ email });
    const isMatchPassword = await comparePassword(
      req.body.password,
      user.password
    );

    if (user && isMatchPassword) {
      const token = createJwt({ userId: user._id, role: user.role });
      const oneDay = 1000 * 60 * 60 * 24;
      res.cookie("token", token, {
        httpOnly: true,
        expiresIn: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
      });

      res.status(StatusCodes.OK).json({ msg: "login successful" });
    } else {
      res
        .status(statusCodes.BAD_REQUEST)
        .json({ msg: "invalid email or password" });
    }
  } catch (error) {
    console.log("login", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
    });
    res.status(StatusCodes.OK).json({ msg: "logout succesfull" });
  } catch (error) {
    console.log("logout", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
  }
};
