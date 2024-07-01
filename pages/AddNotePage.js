import firebase from "../modules/firebase.js";
import setPageHeader from "../modules/setPageHeader.js";
import Form from "../modules/Form.js";

export default class AddNotePage {
  constructor(id) {
    this.id = id;
    setPageHeader("Add Note", "/collection/" + id);

    const form = new Form(
      [
        { type: "editor" },
        { type: "section", text: "source" },
        { type: "input/text", text: "source" },
        { type: "input/hidden", text: "collectionId", value: this.id },
        // { type: "input/text", text: "title" },
        // { type: "input/text", text: "medium" },
        // { type: "input/text", text: "publication year" },
      ],
      "Add Note",
      firebase.routes.notes.create,
      "/collection/" + this.id
    );

    document.getElementById("page-content").append(form);
  }
}
