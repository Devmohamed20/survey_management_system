import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import auth from "./routes/authRoute.js";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middlewares/errorHandller.js";
import { StatusCodes } from "http-status-codes";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
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
