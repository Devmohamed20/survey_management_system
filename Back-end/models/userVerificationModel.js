import mongoose from "mongoose";

const UserVerificationSchema = new mongoose.Schema(
  {
    userId: String,
    uniqueString: String,
    expiresAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("userVerification", UserVerificationSchema);
