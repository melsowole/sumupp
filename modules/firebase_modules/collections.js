import { arrayUnion, where } from "firebase/firestore";
import { auth } from "./firebaseInit.js";

import {
  createDocument,
  readDocument,
  readDocuments,
  updateDocument,
  deleteDocument,
} from "./documents.js";

const cn = "collections";

export async function createCollection({ name, description }) {
  const newCollection = {
    name,
    description,
    notes: [],
    users: [auth.currentUser.uid],
  };

  return await createDocument(cn, newCollection);
}

export async function readCollection(id) {
  return await readDocument(cn, id);
}

export async function readUserCollections(uid) {
  return await readDocuments(cn, where("users", "array-contains", uid));
}

export async function updateCollection(id, changes) {
  // changes must be: {name, description, add-notes, remove-notes, add-users, or remove-users}
  return await updateDocument(cn, id, changes);
}

export async function deleteCollection(id) {
  return await deleteDocument(cn, id);
}
