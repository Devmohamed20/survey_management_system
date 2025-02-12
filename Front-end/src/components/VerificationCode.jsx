import React from "react";
import FormRow from "./FormRow";
import { Form , Link} from "react-router-dom";
import "../styles/pages/authentication.css";
import OTPInput from "./OtpInput";

function VerificationCode() {
  const handleComplete = (otp) => {
    console.log("Entered OTP:", otp);
  };
  return (
    <div className="form-container">
      <h2>Enter verification code</h2>
      <p>
        We have sent you a verification code to your email pleace enter the
        verification code here to ensure that you are really trying to change
        your password{" "}
      </p>
      <Form className="form-row">
        <OTPInput length={4} onComplete={handleComplete} />
        <button type="submit" className="submit-btn">
          <Link to="/forget-password/update-password">Send code</Link>
        </button>
      </Form>
    </div>
  );
}

export default VerificationCode;
