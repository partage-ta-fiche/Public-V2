
async function load_categorie () {

    const url = "/fiche/api/categorie";

    const categorieDiv = document.querySelector('#categorie');
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
        data.forEach(categorie => {
            const option = document.createElement('option');
            option.value = categorie.name;
            option.innerHTML = categorie.name;
            categorieDiv.appendChild(option);
          });
          
      
      
    })
    .catch((error) => console.error(error));
}
async function load_classe () {
    const url = "/fiche/api/classe";

    const categorieDiv = document.querySelector('#classe');
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
        data.forEach(categorie => {
            const option = document.createElement('option');
            option.value = categorie.classe;
            option.innerHTML = categorie.classe;
            categorieDiv.appendChild(option);
          });
          
      
      
    })
    .catch((error) => console.error(error));

}



window.addEventListener("DOMContentLoaded", (event) => {
    async function load_docs () {
        await load_categorie()
        await load_classe()
    }

    load_docs()
    

  
});



