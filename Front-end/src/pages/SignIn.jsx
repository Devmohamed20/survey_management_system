
import { FormRow, PasswordInput } from "../components/index";
import { Form, Link, redirect } from "react-router-dom";
import "../styles/pages/authentication.css";
import axios from "axios";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await axios.post(
      "http://localhost:3005/api/v1/auth/login",
      data,
      { withCredentials: true }
    );
    toast.success(response?.data?.msg, { autoClose: 3000 });
    return redirect("/dashboard");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg, { autoClose: 3000 });
    return error;
  }
};

function SignIn() {
  return (
    <div className="form-container">
      <Form method="POST" className="form-row">
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
      </Form>
    </div>
  );
}

export default SignIn;
