import { where } from "firebase/firestore";
import { auth } from "../firebaseConfig.js";

import * as api from "./documents";

const cn = "collections";

export async function create({ name, description }) {
  const newCollection = {
    name,
    description,
    notes: [],
    users: [auth.currentUser.uid],
  };

  return await api.create(cn, newCollection);
}

export async function read(id) {
  return await api.read(cn, id);
}

// read all user collections
export async function readAll(uid) {
  return await api.readMany(cn, where("users", "array-contains", uid));
}

export async function update(idOrRef, changes) {
  // changes must be: {name, description, add-notes, remove-notes, add-users, or remove-users}
  return await api.update(cn, idOrRef, changes);
}

export async function del(id) {
  return await api.del(cn, id);
}
