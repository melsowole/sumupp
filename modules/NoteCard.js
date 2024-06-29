export default class NoteCard {
  constructor(parent, note) {
    this.parent = parent;
    this.note = note;

    console.log(this.note);
    this.createCard();
  }

  createCard() {
    const li = document.createElement("li");
    this.parent.append(li);

    const article = document.createElement("article");
    article.classList.add("note-card");
    article.id = this.note.id;

    li.append(article);

    this.note.data.blocks.forEach((block) => {
      let tag = setTag(block.type, block.data.level);

      const el = document.createElement(tag);
      el.textContent = block.data.text;

      article.append(el);
    });
  }
}

function setTag(type, level) {
  switch (type) {
    case "paragraph":
      return "p";
      break;
    case "header":
      return "h" + level;
      break;
  }
}
