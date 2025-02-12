import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    lastName: String,
    email: String,
    dateOfBirth: Date,
    address: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: String,
    confirmPassword: String,
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("users", UserSchema);
