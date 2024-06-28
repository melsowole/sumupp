import { auth } from "./firebase";
import Button from "./Button";

export default function initFooter() {
  const authenticatedUser = auth.currentUser;

  if (authenticatedUser) {
    document.getElementById("user-actions").innerHTML = `
    <p>Signed in as: ${auth.currentUser.displayName}</p>
    `;

    const signOutButton = new Button("text", "sign out");
    document.getElementById("user-actions").append(signOutButton);

    signOutButton.addEventListener("click", () => {
      signOut();
    });
  }
}
