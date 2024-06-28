import Button from "./Button.js";

export default class CollectionCard {
  constructor(parent, collection) {
    this.parent = parent;
    this.collection = collection;

    this.createCard();
  }

  createCard() {
    const li = document.createElement("li");

    li.innerHTML = `
    <article class="collection-card" id="${this.collection.id}">
        <h2>${this.collection.name}</h2>
        <p class="description">${this.collection.description}</p>
        <footer>
          <p class="label ideas-amount">
            <span>${this.collection.notes.length}</span> ideas
          </p>
        </footer>
    </article>
    `;

    const cardActionsBtn = new Button("icon-solo", "more", "more_horiz");
    cardActionsBtn.classList.add("collection-actions");

    li.querySelector("footer").append(cardActionsBtn);

    this.parent.append(li);
  }
}
