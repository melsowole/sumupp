import firebase from "../modules/firebase.js";
import NoteCard from "../modules/NoteCard.js";
import setPageHeader from "../modules/setPageHeader.js";
import Button from "../modules/Button.js";
import Source from "../modules/Source.js";

export default class NotePage {
  constructor(noteId, collectionId) {
    this.noteId = noteId;
    this.collectionId = collectionId;
    this.note = null;
    this.source = null;

    this.renderShell();

    setPageHeader(
      "Note",
      "/collection/" + this.collectionId,
      this.pageActions()
    );

    this.populateShell();
  }

  renderShell() {
    document.getElementById("page-content").innerHTML = `
      <div class="note-page-container"></div>
    `;
  }

  async populateShell() {
    const page = document.querySelector(".note-page-container");

    this.note = await firebase.routes.notes.read(this.noteId);
    const note = new NoteCard(this.note);
    page.append(note);

    this.source = await firebase.routes.sources.read(this.note.source);
    const source = new Source(this.source);
    page.append(source);
  }

  pageActions() {
    const deleteButton = new Button("icon", "delete note", "delete");
    deleteButton.addEventListener("click", async () => {
      if (
        confirm(
          "Are you sure you want to delete this note? This action cannot be undone."
        )
      ) {
        await firebase.routes.notes.delete(this.note.id, this.collectionId);
        window.location.replace("/collection/" + this.collectionId);
      }
    });

    return [deleteButton];
  }
}
