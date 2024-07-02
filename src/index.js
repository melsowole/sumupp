import "./App.css"; // styles
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import firebase from "./firebase/firebaseInit";
import router from "./router";

firebase.auth.onAuthStateChanged((user) => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
});
