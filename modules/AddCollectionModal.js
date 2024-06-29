import { collections } from "./firebase.js";
import { FormModal } from "./FormModal.js";
import { createFormInput } from "./Form.js";

export default class AddCollectionModal {
  constructor() {
    const modal = new FormModal(
      "Add Collection",
      [
        { type: "input/text", text: "name", required: true },
        { type: "textarea", text: "description" },
      ],
      "create",
      collections.create
    );

    document.body.append(modal);
  }
}
