import { notes } from "../modules/firebase.js";
import setPageHeader from "../modules/setPageHeader.js";
import Form from "../modules/form.js";

export default class AddNotePage {
  constructor(id) {
    this.id = id;
    setPageHeader("Add Note", "/collection/" + id);

    const form = new Form(
      [{ type: "editor" }, { type: "input/text", text: "source" }],
      "Add Note",
      notes.create
    );

    document.getElementById("page-content").append(form);
  }
}
