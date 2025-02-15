import { Form, Link, redirect } from "react-router-dom";
import { FormRow } from "../components/index";
import "../styles/pages/authentication.css";
import { toast } from "react-toastify";
import axios from "axios";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log("data", data);
  try {
    const response = await axios.post(
      "http://localhost:3005/api/v1/auth/register",
      data,
      { withCredentials: true }
    );
    console.log("response", response);
    toast.success(response?.data?.msg, { autoClose: 3000 });
    return redirect("/forget-password/verfication-code");
  } catch (error) {
    const msg = error?.response?.data?.msg;
    toast.error(msg[0], { autoClose: 3000 });
    return error;
  }
};

function Registeration() {
  return (
    <div className="form-container">
      <Form className="form-row" method="POST">
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

        <button type="submit" className="submit-btn">
          Submit
        </button>

        <p>
          Already a member?
          <Link to="/">login</Link>
        </p>
      </Form>
    </div>
  );
}

export default Registeration;
