import HomePage from "./pages/HomePage.js";
import SignInPage from "./pages/SignInPage.js";
import CollectionPage from "./pages/CollectionPage.js";
import AddNotePage from "./pages/AddNotePage.js";
import { auth } from "./modules/firebase.js";
import initFooter from "./modules/initFooter.js";
import Navigo from "navigo";

const router = new Navigo();

auth.onAuthStateChanged((user) => {
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
    .resolve();
});
