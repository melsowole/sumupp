import { where } from "firebase/firestore";
import * as api from "./documents";

const cn = "sources";

export async function create(link) {
  return await api.create(cn, { link });
}

export async function read(refOrId) {
  return await api.read(cn, refOrId);
}

export async function del() {}

export async function update(idOrRef, changes) {
  // changes must be: {link, add-notes, remove-notes}
  return await api.update(cn, idOrRef, changes);
}

export async function findRef(string) {
  return (await api.readMany(cn, where("link", "==", string), "ref"))[0];
}
