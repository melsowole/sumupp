import firebase from "../firebase/firebaseInit";

export default function Footer() {
  // get signed in state
  const authenticatedUser = firebase.auth.currentUser;

  // TODO: ADD SIGN OUT BUTTON

  return (
    <footer>
      <span> &copy; Sumupp 2024 </span>
      {authenticatedUser && (
        <span id="user-actions">
          <p>Signed in as {firebase.auth.currentUser.displayName}</p>
        </span>
      )}
    </footer>
  );
}
