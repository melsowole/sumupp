import { readDocuments } from "../modules/firebase.js";
import CollectionCard from '../modules/CollectionCard.js';
import AddCollectionModal from "../modules/AddCollectionModal.js";

export default class CollectionPage{
  constructor(collections){
    document.body.innerHTML += `
      <header>
        <h1>My collections</h1>
        <button id="add-collection" class="text-icon-button">Add Collection</button>
      </header>

      <ul class="collection-grid">

      </ul>
    `;

    document.getElementById("add-collection").addEventListener("click", ()=>{
      new AddCollectionModal();
    })
    
    const container = document.querySelector(".collection-grid");
    collections.forEach(collection=>{
      new CollectionCard(container, collection)
    })

  }
}