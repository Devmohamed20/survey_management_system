import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  SignIn,
  DashboardLayout,
  Register,
  UpdatePassword,
} from "./pages/index";
import {
  verifyEmail,
  VerificationCode,
  ForgetPassword,
} from "./components/index";
import VerifyEmail from "./components/VerifyEmail";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignIn />,
  },
  { path: "/register", element: <Register /> },
  {
    path: "/forget-password",
    element: <UpdatePassword />,
    children: [
      { index: true, element: <VerifyEmail /> },
      { path: "verfication-code", element: <VerificationCode /> },
      { path: "update-password", element: <ForgetPassword /> },
    ],
  },
  { path: "/dashboard", element: <DashboardLayout /> },
]);
function App() {
  return <RouterProvider router={router} />;
}
export default App;
