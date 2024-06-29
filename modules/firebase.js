import { auth } from "./firebase_modules/firebaseInit.js";

import { getDocs, query } from "firebase/firestore";
import { collection, updateDoc, arrayUnion, doc } from "firebase/firestore";

import {
  createNote,
  readNote,
  deleteNote,
  updateNote,
  getNotesOfCollection,
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

// INIT

// FUNCTIONS

export const notes = {
  create: createNote,
  read: readNote,
  readAll: getNotesOfCollection,
  update: updateNote,
  delete: deleteNote,
};

export const collections = {
  create: createCollection,
  read: readCollection,
  readAll: readUserCollections,
  update: updateCollection,
  delete: deleteCollection,
};

export const sources = {
  create: createSource,
  read: readSource,
  update: updateSource,
  delete: deleteSource,
};

auth.user = {};
auth.user.signIn = signIn;
auth.user.signOut = signOut;

export { auth, db };

async function addNoteToCollection(noteRef, collectionId) {
  try {
    const collectionRef = doc(db, "collections", collectionId);
    const update = await updateDoc(collectionRef, {
      notes: arrayUnion(noteRef),
    });

    console.log("Added note to collection successfully!");
  } catch (error) {
    console.error("Error adding note to collection: ", error);
  }
}
