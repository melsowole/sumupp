import * as api from "./documents";
import * as sources from "./sources";
import * as collections from "./collections";

const cn = "notes";

export async function create({ data, source, collectionId }) {
  // Get source ref, or add new source
  let sourceRef;
  const existingSourceRef = await sources.findRef(source);
  if (existingSourceRef) {
    sourceRef = existingSourceRef;
  } else {
    sourceRef = await sources.create(source);
  }

  const newNote = {
    data,
    source: sourceRef,
  };

  const noteRef = await api.create(cn, newNote);

  // add note to source
  await sources.update(sourceRef, { "add-notes": noteRef });

  // add note to collection
  await collections.update(collectionId, { "add-notes": noteRef });
}

export async function read(id) {
  return await api.read(cn, id);
}

// all notes of a collection
export async function readAll(collectionId) {
  try {
    const collection = await collections.read(collectionId);

    const notes = collection.notes;

    if (notes.length === 0) {
      return [];
    }

    const notesArray = await Promise.all(
      notes.map(async (noteRef) => {
        return await api.read(cn, noteRef);
      })
    );

    return notesArray;
  } catch (error) {
    console.error("Error fetching collection notes: ", error);
  }
}

export async function update() {}

export async function del(noteId, collectionId) {
  // get note ref
  const noteRef = await getRef(noteId);
  const note = await read(noteId);

  // remove from collection array
  await collections.update(collectionId, { "remove-notes": noteRef });

  // remove from source array
  await sources.update(note.source, { "remove-notes": noteRef });

  // remove note
  await api.del(cn, note.id);
}

export async function getRef(id) {
  return await api.getRef(cn, id);
}
