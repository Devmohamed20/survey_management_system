import statusCodes, { StatusCodes } from "http-status-codes";
import UserModel from "../models/UserModel.js";
import { hashPassword, comparePassword } from "../utils/hashingPassword.js";
import { createJwt, verifyJwt } from "../utils/tokenUtils.js";
import nodemailer from "nodemailer";

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

    const { confirmPassword, ...data } = req.body;
    data.password = passowrdHash;

    if (confirmPassword === req.body.password) {
      // Generate a random 4-digit verification code
      const verificationCode = Math.floor(
        Math.random() * 9000 + 1000
      ).toString();
      const hashVerfCode = await hashPassword(verificationCode);

      let mailOptions = {
        from: "ckgames044@gmail.com",
        to: req.body.email,
        subject: "Verify your email - OTP code",
        text: `your verification code is ${verificationCode}`,
      };
      ``;

      await transporter.sendMail(mailOptions);

      // set isVerified to false
      const token = createJwt({ email: req.body.email });
      const oneDay = 1000 * 60 * 60 * 24;
      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: false,
      });

      data.verificationCode = hashVerfCode;
      data.isVerified = false;
      const user = await UserModel.create(data);

      res.status(statusCodes.CREATED).json({
        msg: "Registration successful. Please check your email to verify your account.",
        verificationCode: verificationCode,
      });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password and confirm password are not equal" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "internal server error" });
  }
};

export const verifyOTPRegistration = async (req, res) => {
  const { email } = req.user;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: "you are not registered please take a go and do a registeration",
    });
  }
  if (user.isVerified) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ msg: "you are already verified" });
  }

  const { verificationCode } = user;

  const isMatch = await comparePassword(
    req.body.verificationCode,
    verificationCode
  );
  if (!isMatch) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "invalid verfication code" });
  }
  user.isVerified = true;
  user.verificationCode = null;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "you are verified" });
};
export const verifyEmailForgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ msg: "this user does not exist" });
  }
  const verificationCode = Math.floor(Math.random() * 9000 + 1000).toString();
  let mailOptions = {
    from: "ckgames044@gmail.com",
    to: req.body.email,
    subject: "Verify your email - OTP code",
    text: `your verification code is ${verificationCode}`,
  };

  await transporter.sendMail(mailOptions);

  const token = createJwt({ email });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: false,
  });

  user.verificationCode = await hashPassword(verificationCode);

  await user.save();

  res
    .status(StatusCodes.OK)
    .json({ msg: "we have sended you a verfication code go ahead and enter" });
};

export const verifyOTPForgetPassword = async (req, res) => {
  const { email } = req.user;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: "you are not registered please take a go and do a registeration",
    });
  }
  if (!user.isVerified) {
    return res
      .status(StatusCodes.CONFLICT)
      .json({
        msg: "you are registered but not veirfied please verify your account",
      });
  }

  const { verificationCode } = user;

  const isMatch = await comparePassword(
    req.body.verificationCode,
    verificationCode
  );
  if (!isMatch) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "invalid verfication code" });
  }
  user.verificationCode = null;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "verification successfull" });
};
export const forgetPass = async (req, res) => {
  const { email } = req.user;
  const data = req.body;
  console.log("data", data);

  if (data.password === data.confirmPassword) {
    data.password = await hashPassword(data.password);
    const user = await UserModel.findOneAndUpdate(
      { email },
      { password: data.password },
      { new: true }
    );
    res
      .status(StatusCodes.OK)
      .json({ msg: "password changed successfully", user: user });
  }
  else{
    
  }
};

export const login = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await UserModel.findOne({ email });
    if (!user.isVerified) {
      return res.status(StatusCodes.FORBIDDEN).json({
        msg: "your registeration is not verified please verfiy your email after registeration",
      });
    }
    const isMatchPassword = await comparePassword(
      req.body.password,
      user.password
    );

    console.log("isMatchPassword", isMatchPassword);

    if (user && isMatchPassword) {
      res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV === "production",
      });
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
