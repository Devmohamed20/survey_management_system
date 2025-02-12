import React from "react";
import { FormRow } from "../components/index";
import { Form } from "react-router-dom";
import "../styles/pages/authentication.css";

function ForgetPassword() {
  return (
    <div className="form-container">
      <h2>Create new password</h2>
      <Form action="" method="post" className="form-row">
        <FormRow type="text" name="password" palaceholder="new password" />
        <FormRow type="text" name="confirm password" palaceholder="confirm password" />
        <button type="submit" className="submit-btn">
          submit
        </button>
      </Form>
    </div>
  );
}

export default ForgetPassword;
