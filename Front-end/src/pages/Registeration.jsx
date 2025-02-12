import React from "react";
import { Form, Link } from "react-router-dom";
import { FormRow } from "../components/index";
import "../styles/pages/authentication.css"

function Registeration() {
  return (
    <div className="form-container">
      <Form className="form-row">
        <h2>Register</h2>
        <FormRow type="text" name="name" />
        <FormRow type="text" name="lastName" labelText="last name" />
        <FormRow type="email" name="email" />
        <FormRow type="text" name="address" />
        <FormRow type="date" name="dateOfBirth" labelText="date of birth" />
        <FormRow type="text" name="password" />
        <FormRow
          type="text"
          name="confirmPassword"
          labelText="confirm password"
        />
        <button type="submit" className="submit-btn">Submit</button>
        <p>
          Already a member?
          <Link to="/login">login</Link>
        </p>
      </Form>
    </div>
  );
}

export default Registeration;
