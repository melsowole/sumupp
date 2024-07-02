import React, { useEffect } from "react";
import firebase from "../firebase/firebaseInit";

export default function SignIn() {
  useEffect(() => {
    const container = document.getElementById("firebaseui-auth-container");
    firebase.auth.user.signIn(container);
  }, []);

  return (
    <>
      <div id="firebaseui-auth-container"></div>
    </>
  );
}
