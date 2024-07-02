import { GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

auth.onAuthStateChanged((user) => {
  if (user) {
    return user;
  } else {
    return false;
  }
});

export async function signIn(container) {
  var uiConfig = {
    signInSuccessUrl: "/",
    signInOptions: [
      GoogleAuthProvider.PROVIDER_ID,
      EmailAuthProvider.PROVIDER_ID,
    ],
    tosUrl: "<your-tos-url>",
    privacyPolicyUrl: function () {
      window.location.assign("<your-privacy-policy-url>");
    },
    callbacks: {
      signInFailure: function (error) {
        // Handle sign-in failures.
        console.error("Sign-in error:", error);
        if (error.code === "auth/email-already-in-use") {
          alert("This email is already associated with an account.");
        }
        // You can handle other specific errors here.
      },
    },
  };

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(auth);

  // The start method will wait until the DOM is loaded.
  ui.start("#" + container.id, uiConfig);
}

export async function signOut() {
  auth.signOut();
  window.location.reload();
}
