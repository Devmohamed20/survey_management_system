import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import auth from "./routes/authRoute.js";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middlewares/errorHandller.js";
import { StatusCodes } from "http-status-codes";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173", //client host
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});
app.use("/api/v1/auth", auth);

// Handle 404 errors
app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "this url is not found" });
});

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3005;

try {
  mongoose.connect(process.env.MONGO_URL);
  app.listen(PORT, () => {
    console.log("server is running on ", PORT);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
