import React from "react";
import { FormRow, PasswordInput } from "../components/index";
import { Form, Link } from "react-router-dom";
import "../styles/pages/authentication.css";

function SignIn() {
  return (
    <div className="form-container">
      <form method="post" className="form-row">
        <h2>Login</h2>
        <FormRow type="email" name="email" />
        <label htmlFor="password">password</label>
        <PasswordInput />

        <button type="submit" className="submit-btn">
          Submit
        </button>
        <p>
          i don't have an account?
          <Link to="/register">register</Link>
        </p>
        <p>
          <Link to="/forget-password">forget password</Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
