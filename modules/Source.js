import firebase from "../modules/firebase.js";

export default class Source {
  constructor(source) {
    this.source = source;

    const wrapper = document.createElement("div");
    wrapper.classList.add("source");

    if (this.source.name) {
      const sourceText = document.createElement("p");
      sourceText.textContent = this.source.name;
      wrapper.append(sourceText);
    }

    if (this.source.link) {
      const sourceLink = document.createElement("a");
      sourceLink.textContent = "view source";
      sourceLink.href = this.source.link;
      wrapper.append(sourceLink);
    }

    return wrapper;
  }
}
