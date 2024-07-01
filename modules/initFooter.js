import firebase from "./firebase";
import Button from "./Button";

export default function initFooter() {
  const authenticatedUser = firebase.auth.currentUser;

  if (authenticatedUser) {
    document.getElementById("user-actions").innerHTML = `
    <p>Signed in as: ${firebase.auth.currentUser.displayName}</p>
    `;

    const signOutButton = new Button("text", "sign out");
    document.getElementById("user-actions").append(signOutButton);

    signOutButton.addEventListener("click", () => {
      signOut();
    });
  }
}
