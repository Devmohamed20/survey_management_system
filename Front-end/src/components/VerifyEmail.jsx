import React from "react";
import { FormRow } from "./index";
import { Form, Link } from "react-router-dom";
import "../styles/pages/authentication.css";

function VerifyEmail() {
  return (
    <div className="form-container ">
      <Form className="form-row">
        <h2>press send code button to send you verification code </h2>
        <FormRow type="email" name="email" palaceholder="Enter your email"/>
        <button type="submit" className="submit-btn">
          <Link to="/forget-password/verfication-code">Send code</Link>
        </button>
      </Form>
    </div>
  );
}

export default VerifyEmail;
