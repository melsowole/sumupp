import { getDocuments, getUserCollections } from "../modules/firebase";
import CollectionGrid from "../modules/CollectionGrid";
import AddCollectionModal from "../modules/AddCollectionModal.js";
import setPageHeader from "../modules/setPageHeader.js";
import Button from "../modules/Button.js";

export default class HomePage {
  constructor(user) {
    setPageHeader("My collections", null, this.pageActions());

    const parent = document.getElementById("page-content");

    getUserCollections(user.uid).then((collections) => {
      new CollectionGrid(parent, collections);
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
