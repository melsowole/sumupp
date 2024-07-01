import { auth, db } from "./firebase_modules/firebaseInit.js";

import {
  createNote,
  readNote,
  deleteNote,
  updateNote,
  getNotesOfCollection,
  getNoteRef,
} from "./firebase_modules/notes.js";

import {
  createCollection,
  readCollection,
  readUserCollections,
  deleteCollection,
  updateCollection,
  readUserCollections,
} from "./firebase_modules/collections.js";

import {
  createSource,
  readSource,
  deleteSource,
  updateSource,
} from "./firebase_modules/sources.js";

import { signIn, signOut } from "./firebase_modules/authentication.js";

// Initialize auth obj
auth.user = {};
auth.user.signIn = signIn;
auth.user.signOut = signOut;

// Define API routes
const notes = {
  create: createNote,
  read: readNote,
  readAll: getNotesOfCollection,
  update: updateNote,
  delete: deleteNote,
  getRef: getNoteRef,
};

const collections = {
  create: createCollection,
  read: readCollection,
  readAll: readUserCollections,
  update: updateCollection,
  delete: deleteCollection,
};

const sources = {
  create: createSource,
  read: readSource,
  update: updateSource,
  delete: deleteSource,
};

export default {
  routes: {
    notes,
    collections,
    sources,
  },
  auth,
  db,
};
