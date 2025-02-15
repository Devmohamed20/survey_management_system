import React from "react";
import { FormRow } from "./index";
import { Form, Link, redirect } from "react-router-dom";
import "../styles/pages/authentication.css";
import axios from "axios";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await axios.post(
      "http://localhost:3005/api/v1/auth/forget-password/verify-email-forget-password",
      data,
      { withCredentials: true }
    );
    toast.success(response?.data?.msg, { autoClose: 3000 });
    return redirect("/forget-password/forget-verfication-code");
  } catch (error) {
    const msg = error?.response?.data?.msg;
    toast.error(msg[0], { autoClose: 3000 });
    console.log(error);
    return error;
  }
};

function VerifyEmail() {
  return (
    <div className="form-container ">
      <Form method="POST" className="form-row">
        <h2>press send code button to send you verification code </h2>
        <FormRow type="email" name="email" palaceholder="Enter your email" />
        <button type="submit" className="submit-btn">
          Send code
        </button>
      </Form>
    </div>
  );
}

export default VerifyEmail;
