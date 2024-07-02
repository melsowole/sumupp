import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";

export default createBrowserRouter([
  {
    path: "*",
    element: <SignIn />,
  },
]);
