export default class NoteCard{
  constructor(parent, note){
    this.parent = parent;
    this.note = note;
    this.createCard();
  }

  createCard(){
    const li = document.createElement("li");
    this.parent.append(li);

    const article = document.createElement("article");
    article.classList.add("note");
    article.id = this.note.id;

    li.append(article);

    if(this.note.title){
      const title = document.createElement("h3");
      title.textContent = this.note.title;
      article.append(title);
    }

    if(this.note.text){
      const text = document.createElement("p");
      text.textContent = this.note.text;
      article.append(text);
    }

  }
}