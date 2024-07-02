import { auth, db } from "./firebaseConfig.js";
import * as notes from "./crud/notes.js";
import * as collections from "./crud/collections.js";
import * as sources from "./crud/sources.js";
import { signIn, signOut } from "./crud/authentication.js";

// Initialize auth obj
auth.user = {};
auth.user.signIn = signIn;
auth.user.signOut = signOut;

const moduleExports = {
  routes: {
    notes,
    collections,
    sources,
  },
  auth,
  db,
};

export default moduleExports;
