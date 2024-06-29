import { db, auth } from "./firebaseInit.js";
import { arrayUnion, collection, query } from "firebase/firestore";
import { getDoc, getDocs, updateDoc, addDoc, doc } from "firebase/firestore";
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
    let docRef;

    if (typeof idOrRef == "string") {
      docRef = doc(db, collectionName, idOrRef);
    } else {
      docRef = idOrRef;
    }

    const docSnapshot = await getDoc(docRef);

    return docSnapshot.data();
  } catch (error) {
    console.error(`Error reading document: `, error);
    throw new Error("Failed to read document!");
  }
}

export async function readDocuments(collectionName, whereStatement) {
  try {
    const q = query(collection(db, collectionName), whereStatement);

    const querySnapshot = await getDocs(q);

    return getQueryData(querySnapshot);
  } catch (error) {
    console.error(`Error reading documents: `, error);
    throw new Error("Failed to read documents!");
  }
}

export async function updateDocument(collectionName, id, changes) {
  try {
    const collectionRef = doc(db, collectionName, id);

    for (const key in changes) {
      if (key.contains(/add|remove/)) {
        const fieldName = key.split("-")[1];
        if (key.contains("add")) {
          changes[fieldName] = arrayUnion(changes[key]);
        } else {
          changes[fieldName] = arrayRemove(changes[key]);
        }
        delete changes[key];
      }
    }

    await updateDoc(collectionRef, changes);

    console.log(`Document successfully updated!`);
  } catch (error) {
    console.error(`Error updating document: `, error);
    throw new Error("Failed to read document!");
  }
}

export async function deleteDocument(collectionName, id) {
  try {
    console.log(`Document successfully deleted!`);
  } catch (error) {
    console.error(`Error deleting document: `, error);
    throw new Error("Failed to delete document!");
  }
}
