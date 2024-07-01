import firebase from "../modules/firebase.js";
import setPageHeader from "../modules/setPageHeader.js";

export default class SignInPage {
  constructor() {
    const container = document.createElement("div");
    container.id = "firebaseui-auth-container";

    setPageHeader("Welcome to Sumupp");

    document.getElementById("page-content").append(container);

    firebase.auth.user.signIn(container);
  }
}
