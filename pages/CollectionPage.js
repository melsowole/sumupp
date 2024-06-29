import { collections, notes } from "../modules/firebase.js";
import NoteCard from "../modules/NoteCard.js";
import setPageHeader from "../modules/setPageHeader.js";
import Button from "../modules/Button.js";

export default class CollectionPage {
  constructor(id) {
    this.id = id;
    this.collection = null;
    this.notes = [];

    this.renderShell();

    this.populateShell();
  }

  renderShell() {
    document.getElementById("page-content").innerHTML = `
      <p class="description"></p>
      <hr>
      <ul class="note-grid"></ul>
    `;
  }

  async populateShell() {
    collections.read(this.id).then((collection) => {
      this.collection = collection;
      setPageHeader(this.collection.name, "/", this.pageActions());

      if (this.collection.description) {
        document.querySelector(".description").textContent =
          this.collection.description;
      }
    });

    notes.readAll(this.id).then((notes) => {
      this.notes = notes;
      const parent = document.querySelector(".note-grid");

      if (this.notes.length === 0) {
        const noNotesMessage = document.createElement("span");
        noNotesMessage.textContent = "No notes yet...";
        parent.append(noNotesMessage);
      }

      notes.forEach((note) => {
        new NoteCard(parent, note);
      });
    });
  }

  pageActions() {
    const editCollectionButton = new Button("text-icon", "edit", "edit");

    return [editCollectionButton];
  }
}
