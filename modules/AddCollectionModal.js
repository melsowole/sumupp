import{addCollection} from "./firebase.js";

export default class AddCollectionModal{
  constructor(){
    const modal = document.createElement("div");
    modal.classList.add("modal");
    document.body.append(modal)

    modal.innerHTML =`
      <div class="modal-card">
        <button id="close" aria-label="close">x</button>
        <form>
          <h2>Add Collection</h2>
          <div class="input-wrapper">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div class="input-wrapper">
            <label for="description">Description</label>
            <textarea id="description" name="description"></textarea>
          </div>
          <button id="add">Create</button>
        </form>
      </div>
    `;

    document.getElementById("close").addEventListener("click", ()=>{
      modal.remove();
    })

    document.querySelector("form").addEventListener("submit", async (e)=>{
      e.preventDefault();

      const formData = Object.fromEntries( new FormData(e.target).entries() );

      addCollection(formData).then(r=>{
        window.location.reload();
      });
    });

  }
}