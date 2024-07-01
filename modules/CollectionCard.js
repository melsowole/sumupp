import Button from "./Button.js";

export default class CollectionCard {
  constructor(collection) {
    this.collection = collection;

    return this.createCard();
  }

  createCard() {
    const card = document.createElement("article");
    card.classList.add("collection-card");
    card.id = this.collection.id;

    card.innerHTML = `
        <h2>${this.collection.name}</h2>
        <p class="description">${this.collection.description}</p>
        <footer>
          <p class="label ideas-amount">
            <span>${this.collection.notes.length}</span> ideas
          </p>
        </footer>
    `;

    const cardActionsBtn = new Button("icon-solo", "more", "more_horiz");
    cardActionsBtn.classList.add("collection-actions");

    card.querySelector("footer").append(cardActionsBtn);

    return card;
  }
}
