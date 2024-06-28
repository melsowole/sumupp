import CollectionPage from "./pages/CollectionPage";
import SignInPage from "./pages/SignInPage.js";
import { initApp, signOut, readDocuments, getUserCollections } from "./modules/firebase.js";
import Navigo from "navigo";

const router = new Navigo();

router
  .on(()=>{
    initApp().then(user=>{
      if(user){
        document.body.innerHTML = `
          <p>Logged in</p>
          <button>Sign out</button>
        `;

        document.querySelector("button").addEventListener("click", ()=>{
          signOut();
        })

        readDocuments("collections").then(r=>{
          console.log(r);
        })

        getUserCollections(user.uid).then(r=>{
          console.log(r);

          new CollectionPage(r);
        })
        
        console.log(user.uid);

      } else {
        router.navigate("/welcome")
      }
    })

  })
  .on("/welcome", ()=>{
    new SignInPage();
  })
  .resolve();
