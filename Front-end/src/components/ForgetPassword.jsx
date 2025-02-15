import { FormRow } from "../components/index";
import { Form, Link, redirect } from "react-router-dom";
import "../styles/pages/authentication.css";
import axios from "axios";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    console.log("response");
    const response = await axios.post(
      "http://localhost:3005/api/v1/auth/forget-password/update-password",
      data,
      { withCredentials: true }
    );
    toast.success("password successfully updated");
    return redirect("/");
  } catch (error) {
    console.log(error);
    const msg = error?.response?.data?.msg;
    toast.error(msg, { autoClose: 3000 });
    return error;
  }
};
function ForgetPassword() {
  return (
    <div className="form-container">
      <h2>Create new password</h2>
      <Form action="" method="post" className="form-row">
        <FormRow type="text" name="password" palaceholder="new password" />
        <FormRow
          type="text"
          name="confirmPassword"
          palaceholder="confirm password"
        />
        <button type="submit" className="submit-btn">
          submit
        </button>
      </Form>
    </div>
  );
}

export default ForgetPassword;
