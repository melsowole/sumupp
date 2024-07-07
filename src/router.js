import firebase from "./firebase/firebaseInit";
import publicRouter from "./routes/publicRouter";
import privateRouter from "./routes/privateRouter";

const isSignedIn = firebase.auth.currentUser;

function getRouter() {
  console.log("deciding router");

  return isSignedIn ? privateRouter : publicRouter;
}

export default getRouter;
