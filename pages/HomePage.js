import firebase from "../modules/firebase";
import CollectionGrid from "../modules/CollectionGrid";
import CollectionCard from "../modules/CollectionCard.js";
import Grid from "../modules/Grid.js";
import AddCollectionModal from "../modules/AddCollectionModal.js";
import setPageHeader from "../modules/setPageHeader.js";
import Button from "../modules/Button.js";

export default class HomePage {
  constructor(user) {
    setPageHeader("My collections", null, this.pageActions());

    const parent = document.getElementById("page-content");

    firebase.routes.collections.readAll(user.uid).then((collections) => {
      const collectionGrid = new Grid({
        gridType: "collection",
        itemType: CollectionCard,
        items: collections,
        clickablePath: "/collection/",
      });
      parent.append(collectionGrid);
    });
  }

  pageActions() {
    const addCollectionBtn = new Button("text-icon", "add collection", "add");

    addCollectionBtn.addEventListener("click", () => {
      new AddCollectionModal();
    });

    return [addCollectionBtn];
  }
}
