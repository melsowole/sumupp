export default class EditCitationModal{
  constructor(id){
    this.id = id;

    this.displayModal();
  }

  displayModal(){
    const dom = document.createElement("section");
    
    dom.innerHTML = `
      <h3>Edit Citation</h3>
      <button id="deleteCitation">Delete</button>
      <button id="editCitation">Edit</button>
    `;

    dom.querySelector("deleteCitation").addEventListener("click", this.deleteCitation);

    document.body.append(dom);
  }

  async deleteCitation(){
    if(confirm("Do you want to delete the citation?")){
      await deleteCitation(this.id);

      window.location.reload();
    }

    console.log(api_url + `/${id}`);
    const response = await fetch(api_url + `/${id}` , {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const reply = await response.json();
  }

}