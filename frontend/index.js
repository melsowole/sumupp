import Citation from "./Citation.js";
import EditCitationModal from "./EditCitationModal.js";

const api_url = "http://localhost:3000";


fetch(api_url)
.then(r=>r.json())
.then(citations=>{
  for (const citation of citations) {
    const container = document.getElementById("citations-container");
    container.append(new Citation(citation));
  }
})

const form = document.querySelector("form");

form.addEventListener("submit", handleFormSubmit);

document.addEventListener("click", async (e)=>{
  const citation = e.target.closest("article");

  if(citation){
    const editModal = new EditCitationModal(citation.id);
  }
})

async function handleFormSubmit(e){
  e.preventDefault();

  const formData = new FormData(form);

  const response = await fetch(api_url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.fromEntries(formData.entries()))
  });

  const reply = await response.json();

  window.location.reload();

}



