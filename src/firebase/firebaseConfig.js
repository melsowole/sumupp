import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7W58eZyV93WtK_yjfP8ye2BQxCSk3yBc",
  authDomain: "sumupp-30327.firebaseapp.com",
  projectId: "sumupp-30327",
  storageBucket: "sumupp-30327.appspot.com",
  messagingSenderId: "698087444830",
  appId: "1:698087444830:web:2bf2ad3fb0a87a7e9c7fcf",
  measurementId: "G-ENJR4HFF43",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // give access to currentUser outside module
export const db = getFirestore(app);
