import { getQueryData } from "./auxi";
import { readCollection, updateCollection } from "./collections";
import { createSource, findSourceRef, updateSource } from "./sources";
import {
  createDocument,
  readDocument,
  getDocRef,
  deleteDocument,
} from "./documents";

const cn = "notes";

export async function createNote({ data, source, collectionId }) {
  // Get source ref, or add new source
  let sourceRef;
  const existingSourceRef = await findSourceRef(source);
  if (existingSourceRef) {
    sourceRef = existingSourceRef;
  } else {
    sourceRef = await createSource(source);
  }

  const newNote = {
    data,
    source: sourceRef,
  };

  const noteRef = await createDocument(cn, newNote);

  // add note to source
  await updateSource(sourceRef, { "add-notes": noteRef });

  // add note to collection
  await updateCollection(collectionId, { "add-notes": noteRef });
}

export async function readNote(id) {
  return await readDocument(cn, id);
}

export async function updateNote() {}

export async function deleteNote(noteId, collectionId) {
  // get note ref
  const noteRef = await getNoteRef(noteId);
  const note = await readNote(noteId);

  // remove from collection array
  await updateCollection(collectionId, { "remove-notes": noteRef });

  // remove from source array
  await updateSource(note.source, { "remove-notes": noteRef });

  // remove note
  await deleteDocument(cn, note.id);
}

// EXTRA
export async function getNotesOfCollection(collectionId) {
  try {
    const collection = await readCollection(collectionId);

    const notes = collection.notes;

    if (notes.length === 0) {
      return [];
    }

    const notesArray = await Promise.all(
      notes.map(async (noteRef) => {
        return await readDocument(cn, noteRef);
      })
    );

    return notesArray;
  } catch (error) {
    console.error("Error fetching collection notes: ", error);
  }
}

export async function getNoteRef(id) {
  return await getDocRef(cn, id);
}
