import { setConsent } from "firebase/analytics";
import { getCollectionNotes, getCollection } from "../modules/firebase.js";
import NoteCard from "../modules/NoteCard.js";
import setPageHeader from "../modules/setPageHeader.js";

export default class CollectionPage{
  constructor(id){
    this.id = id;
    this.collection = null;
    this.notes = [];

    this.renderShell();

    this.init();

  }

  renderShell(){
    document.getElementById("page-content").innerHTML = `
      <p class="description"></p>
      <hr>
      <ul class="note-grid"></ul>
    `;

  }

  async init(){

    getCollection(this.id).then(collection=>{
      this.collection = collection;
      setPageHeader(this.collection.name, "/", this.pageActions());


      if(this.collection.description){
        document.querySelector(".description").textContent = this.collection.description;
      }
    })

    getCollectionNotes(this.id).then(notes=>{
      const parent = document.querySelector(".note-grid");

      notes.forEach(note=>{
        new NoteCard(parent, note);
      })
    })
  }

  pageActions(){
    return []
  }

}

