import React from "react";
import { Form, Link, redirect } from "react-router-dom";
import "../styles/pages/authentication.css";
import OTPInput from "./OtpInput";
import { useState } from "react";
import axios from "axios";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const otp = formData.get("otp");
  const data = { verificationCode: otp };
  try {
    const response = await axios.post(
      "http://localhost:3005/api/v1/auth/forget-password/verify-otp-forget-password",
      data,
      {
        withCredentials: true,
      }
    );
    console.log("response", response);
    return redirect("/forget-password/update-password");
  } catch (error) {
    console.log(error);
    return error;
  }
};
function VerificationCodeForgetPassword() {
  const [otp, setOtp] = useState("");
  const handleComplete = (otp) => {
    setOtp(otp);
  };
  return (
    <div className="form-container">
      <h2>Enter verification code</h2>
      <p>
        We have sent you a verification code to your email pleace enter the
        verification code here to ensure that you are really trying to change
        your password{" "}
      </p>
      <Form method="POST" className="form-row">
        <OTPInput length={4} onComplete={handleComplete} />
        <input type="hidden" name="otp" value={otp} />
        <button type="submit" className="submit-btn">
          Submit code
        </button>
      </Form>
    </div>
  );
}
export default VerificationCodeForgetPassword;
