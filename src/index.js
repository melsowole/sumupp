import "./App.css"; // styles
import React from "react";
import ReactDOM from "react-dom/client";

import firebase from "./firebase/firebaseInit";
import getRouter from "./router";
import { RouterProvider } from "react-router-dom";

console.log("app start");

firebase.auth.onAuthStateChanged((user) => {
  console.log("auth state changed");
  const router = getRouter();
  console.log(router);
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
});
