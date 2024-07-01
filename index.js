import HomePage from "./pages/HomePage.js";
import SignInPage from "./pages/SignInPage.js";
import CollectionPage from "./pages/CollectionPage.js";
import AddNotePage from "./pages/AddNotePage.js";
import firebase from "./modules/firebase.js";
import initFooter from "./modules/initFooter.js";
import Navigo from "navigo";
import NotePage from "./pages/NotePage.js";

const router = new Navigo("/");

firebase.auth.onAuthStateChanged((user) => {
  initFooter();

  router
    .on("/", () => {
      if (user) {
        new HomePage(user);
      } else {
        router.navigate("/welcome");
      }
    })
    .on("/welcome", () => {
      if (user) {
        router.navigate("/");
      } else {
        new SignInPage();
      }
    })
    .on("/collection/:id", async ({ data }) => {
      new CollectionPage(data.id);
    })
    .on("/collection/:id/add", async ({ data }) => {
      new AddNotePage(data.id);
    })
    .on("/collection/:collectionId/note/:noteId", async ({ data }) => {
      new NotePage(data.noteId, data.collectionId);
    })
    .resolve();
});
