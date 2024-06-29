import { getQueryData } from "./auxi";
import { readCollection } from "./collections";
import { createDocument, readDocument } from "./documents";

const cn = "notes";

export async function createNote({ data, source, collectionId }) {
  // TODO: get source ref, or add source

  const newNote = {
    data,
    source, // TODO: add reference
  };

  // TODO: add note to collection

  return await createDocument(cn, newNote);
}

export function readNote(id) {}

export function updateNote() {}

export function deleteNote() {}

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

// HELPERS

async function getNoteIdsOfCollection(collectionId) {
  try {
    const collection = await readCollection(collectionId);
    return collection.notes;
  } catch (error) {
    return "Error fetching notes ids of collection: ", error;
  }
}
