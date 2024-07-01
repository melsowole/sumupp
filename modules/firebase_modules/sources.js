import { arrayUnion, where } from "firebase/firestore";
import { auth } from "./firebaseInit.js";

import {
  createDocument,
  readDocument,
  readDocuments,
  updateDocument,
  deleteDocument,
} from "./documents.js";

const cn = "sources";

export async function createSource(link) {
  return await createDocument(cn, { link });
}

export async function readSource(refOrId) {
  return await readDocument(cn, refOrId);
}

export async function deleteSource() {}

export async function updateSource(idOrRef, changes) {
  // changes must be: {link, add-notes, remove-notes}
  return await updateDocument(cn, idOrRef, changes);
}

export async function findSourceRef(string) {
  return (await readDocuments(cn, where("link", "==", string), "ref"))[0];
}
