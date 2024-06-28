import CollectionCard from './CollectionCard.js';

export default class CollectionGrid{
  constructor(parent, collections){

    const grid = document.createElement("ul");
    grid.classList.add("collection-grid");
    parent.append(grid);
    
    collections.forEach(collection=>{
      new CollectionCard(grid, collection);
    })

    console.log(grid);

    window.addEventListener("click", e=>{

      const collectionActions = e.target.closest(".collection-actions");
      const collectionCard = e.target.closest(".collection-card");

      if(collectionActions){
        console.log("More");
      } else if(collectionCard){
        console.log("See Collection")
        window.location.assign("/collection/" + collectionCard.id);
      }

    })

  }
}