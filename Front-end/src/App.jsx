import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  SignIn,
  DashboardLayout,
  Register,
  UpdatePassword,
} from "./pages/index";
import { VerificationCode, ForgetPassword } from "./components/index";
import VerifyEmail from "./components/VerifyEmail";
import { action as registerAction } from "./pages/Registeration";
import { action as VerificationCodeAction } from "./components/VerificationCode";
import { action as loginAction } from "./pages/SignIn";
import { action as verifyForgetPassEmail } from "./components/VerifyEmail";
import { action as forgetVerAction } from "./components/VerificationCodeForgetPassword";
import {action as updatePasswordAction} from "./components/ForgetPassword"
import VerificationCodeForgetPassword from "./components/VerificationCodeForgetPassword";

const router = createBrowserRouter([
  { path: "/", element: <SignIn />, action: loginAction },

  {
    path: "/register",
    element: <Register />,
    action: registerAction,
  },
  {
    path: "/forget-password",
    element: <UpdatePassword />,
    children: [
      { index: true, element: <VerifyEmail />, action: verifyForgetPassEmail },
      {
        path: "verfication-code",
        element: <VerificationCode />,
        action: VerificationCodeAction,
      },
      {
        path: "forget-verfication-code",
        element: <VerificationCodeForgetPassword />,
        action: forgetVerAction,
      },
      { path: "update-password", element: <ForgetPassword />, action: updatePasswordAction },
    ],
  },
  { path: "/dashboard", element: <DashboardLayout /> },
]);
function App() {
  return <RouterProvider router={router} />;
}
export default App;
