import { addCollection } from "./firebase.js";
import Button from "./Button.js";

export default class AddCollectionModal {
  constructor() {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    document.body.append(modal);

    modal.innerHTML = `
      <div class="modal-card">
        <form>
          <h2>Add Collection</h2>
          <div class="input-wrapper">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div class="input-wrapper">
            <label for="description">Description</label>
            <textarea id="description" name="description"></textarea>
          </div>
        </form>
      </div>
    `;

    const closeBtn = new Button("icon", "close modal", "close");
    closeBtn.id = "close";
    document.querySelector(".modal-card").prepend(closeBtn);

    closeBtn.addEventListener("click", () => {
      modal.remove();
    });

    const submitBtn = new Button("text", "create");
    document.querySelector("form").append(submitBtn);

    document.querySelector("form").addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = Object.fromEntries(new FormData(e.target).entries());

      addCollection(formData).then((r) => {
        window.location.reload();
      });
    });
  }
}
