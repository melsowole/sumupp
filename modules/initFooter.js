import { auth } from "./firebase";

export default function initFooter() {
  const authenticatedUser = auth.currentUser;

  if (authenticatedUser) {
    document.getElementById("user-actions").innerHTML = `
    <p>Signed in as: ${auth.currentUser.displayName}</p>
    <button id="sign-out">Sign out</button>
    `;

    document.getElementById("sign-out").addEventListener("click", () => {
      signOut();
    });
  }
}
