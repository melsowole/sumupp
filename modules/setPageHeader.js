
export default function setPageHeader(title, backRoute, actions){
  document.getElementById("page-title").textContent = title;
  
  if(backRoute){
    document.getElementById("back-nav").addEventListener("click", ()=>{
      window.location.assign(backRoute);
    })
  } else {
    document.getElementById("back-nav").remove();
  }

  if(actions){
    actions.forEach(action => {
      document.getElementById("page-actions").append(action)
    });
  }else {
    document.getElementById("page-actions").remove();
  }
}