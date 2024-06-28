
export default class CollectionCard{
  constructor(parent, collection){

    this.parent = parent;
    this.collection = collection;

    this.createCard();

  }

  createCard(){
    const li = document.createElement("li");

    li.innerHTML = `
    <article class="collection-card" id="${this.collection.id}">
        <h2>${this.collection.name}</h2>
        <p class="description">${this.collection.description}</p>
        <footer>
          <p class="label ideas-amount">
            <span>${this.collection.notes.length}</span> ideas
          </p>
          <button class="icon-button collection-actions">More</button>
        </footer>
    </article>
    `;

    this.parent.append(li);

  }
}