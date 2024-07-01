export default class NoteCard {
  constructor(note) {
    this.note = note;

    return this.createCard();
  }

  createCard() {
    const card = document.createElement("article");
    card.classList.add("note-card");
    card.id = this.note.id;

    this.note.data.blocks.forEach((block) => {
      let tag = setTag(block.type, block.data.level);

      const el = document.createElement(tag);
      el.textContent = block.data.text;

      card.append(el);
    });

    return card;
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
