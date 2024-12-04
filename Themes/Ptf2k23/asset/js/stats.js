async function fiche_number() {
    const element = document.getElementById("stats_user");

  
  const url = "/fiche/api/usernumber";

 
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      
      element.innerHTML = `${data.response}`;
    })
    .catch((error) => console.error(error));


}
async function user_number () {
    
    const url2 = "/fiche/api/fichenumber";

    const element2 = document.getElementById("stats_fiche");
  
  fetch(url2)
    .then((response) => response.json())
    .then((data) => {
     
      element2.innerHTML = `${data.response}`;
    })
    .catch((error) => console.error(error));

}

window.addEventListener("DOMContentLoaded", (event) => {
    async function load_docs () {
        await fiche_number()
        await user_number()
    }

    load_docs()
    

  
});



