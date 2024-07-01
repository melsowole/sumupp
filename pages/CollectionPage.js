import firebase from "../modules/firebase.js";
import NoteCard from "../modules/NoteCard.js";
import setPageHeader from "../modules/setPageHeader.js";
import Button from "../modules/Button.js";
import Grid from "../modules/Grid.js";

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
    `;
  }

  async populateShell() {
    firebase.routes.collections.read(this.id).then((collection) => {
      this.collection = collection;
      setPageHeader(this.collection.name, "/", this.pageActions());

      if (this.collection.description) {
        document.querySelector(".description").textContent =
          this.collection.description;
      }
    });

    firebase.routes.notes.readAll(this.id).then((notes) => {
      this.notes = notes;

      const grid = new Grid({
        gridType: "note",
        items: notes,
        itemType: NoteCard,
        clickablePath: "/collection/" + this.id + "/note/",
      });

      const parent = document.getElementById("page-content");

      parent.append(grid);
    });
  }

  pageActions() {
    const addNoteButton = new Button("text-icon", "add new note", "add");
    addNoteButton.addEventListener("click", () => {
      window.location.assign(window.location.pathname + "/add");
    });

    return [addNoteButton];
  }
}
