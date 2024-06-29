import Button from "./Button.js";
import Form from "./Form.js";

class Modal {
  constructor(title) {
    this.modal;
    this.card;

    const modal = document.createElement("div");
    this.modal = modal;
    modal.classList.add("modal");
    document.body.append(modal);

    const card = document.createElement("div");
    this.card = card;
    card.classList.add("modal-card");
    modal.append(card);

    const titleEl = document.createElement("h2");
    titleEl.textContent = title;

    const closeBtn = new Button("icon", "close modal", "close");
    closeBtn.id = "close";

    card.append(titleEl, closeBtn);

    closeBtn.addEventListener("click", () => {
      modal.remove();
    });

    return { modal, card };
  }
}

export class FormModal extends Modal {
  constructor(title, inputDOMArray, submitText, submitAction) {
    super(title);

    const form = new Form(inputDOMArray, submitText, submitAction);
    this.card.append(form);

    return this.modal;
  }
}
