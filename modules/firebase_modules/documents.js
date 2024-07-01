import { db, auth } from "./firebaseInit.js";
import { arrayUnion, arrayRemove, collection, query } from "firebase/firestore";
import {
  getDoc,
  getDocs,
  updateDoc,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { getQueryData } from "./auxi.js";

export async function createDocument(collectionName, newDocObj) {
  try {
    newDocObj.created = serverTimestamp();
    newDocObj.author = auth.currentUser.uid;

    const newDocRef = await addDoc(collection(db, collectionName), newDocObj);

    console.log(
      `Document successfully added to ${collectionName} :`,
      newDocObj
    );
    return newDocRef;
  } catch (error) {
    console.error(`Error adding document to ${collectionName}: `, error);
    throw new Error("Failed to add new document!");
  }
}

export async function readDocument(collectionName, idOrRef) {
  try {
    const docRef = await getDocRef(collectionName, idOrRef);

    const docSnapshot = await getDoc(docRef);

    return getQueryData(docSnapshot);
  } catch (error) {
    console.error(`Error reading document: `, error);
    throw new Error("Failed to read document!");
  }
}

export async function readDocuments(collectionName, whereStatement, getRef) {
  try {
    const q = query(collection(db, collectionName), whereStatement);

    const querySnapshot = await getDocs(q);

    if (getRef) {
      return querySnapshot.docs.map((doc) => doc.ref);
    } else {
      return getQueryData(querySnapshot);
    }
  } catch (error) {
    console.error(`Error reading documents: `, error);
    throw new Error("Failed to read documents!");
  }
}

export async function updateDocument(collectionName, idOrRef, changes) {
  try {
    const docRef = await getDocRef(collectionName, idOrRef);

    for (const key in changes) {
      if (/add|remove/.test(key)) {
        const fieldName = key.split("-")[1];
        if (key.includes("add")) {
          changes[fieldName] = arrayUnion(changes[key]);
        } else {
          changes[fieldName] = arrayRemove(changes[key]);
        }
        delete changes[key];
      }
    }

    await updateDoc(docRef, changes);
    console.log(`Document successfully updated!`);
  } catch (error) {
    console.error(`Error updating document: `, error);
    throw new Error("Failed to update document!");
  }
}

export async function deleteDocument(collectionName, id) {
  try {
    await deleteDoc(doc(db, collectionName, id));
    console.log(`Document successfully deleted!`);
  } catch (error) {
    console.error(`Error deleting document: `, error);
    throw new Error("Failed to delete document!");
  }
}

export async function getDocRef(collectionName, idOrRef) {
  let docRef;

  if (typeof idOrRef == "string") {
    const id = idOrRef;
    docRef = doc(db, collectionName, id);
  } else {
    const ref = idOrRef;
    docRef = ref;
  }

  return docRef;
}
