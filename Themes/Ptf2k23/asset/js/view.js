async function last_fiche() {
  const url2 = "/fiche/api/last";


  fetch(url2)
    .then((response) => response.json())
    .then((fiche) => {
      // Récupère l'élément HTML avec la classe 'container'
      const container = document.querySelector(".container");

      // Crée un nouvel élément HTML de type 'div'
      const row = document.createElement("div");

      // Ajoute la classe 'row' à l'élément div
      row.classList.add("row", "pt-5", "mt-5");

      // Crée un nouvel élément HTML de type 'div'
      const col12 = document.createElement("div");

      // Ajoute la classe 'col-12' à l'élément div
      col12.classList.add("col-12");

      // Crée un nouvel élément HTML de type 'h3'
      const title = document.createElement("h3");

      // Ajoute le texte 'Voir les dernières fiches publiées : ' à l'élément 'h3'
      title.innerText = "Voir les dernières fiches publiées : ";

      // Ajoute l'élément 'h3' à l'élément 'col-12'
      col12.appendChild(title);

      // Ajoute l'élément 'col-12' à l'élément 'row'
      row.appendChild(col12);

      // Parcourt chaque élément du tableau 'fiche'
      fiche.forEach((ficheElement) => {
        // Crée un nouvel élément HTML de type 'div'
        const colDiv = document.createElement("div");

        // Ajoute la classe 'col-12' et 'col-lg-4' à l'élément div
        colDiv.classList.add("col-12", "col-lg-4", "mt-5", "mt-lg-0");

        // Crée un nouvel élément HTML de type 'div'
        const cardDiv = document.createElement("div");

        // Ajoute la classe 'card' et 'card-body' à l'élément div
        cardDiv.classList.add("card", "card-body", "align-items-center");

        // Crée un nouvel élément HTML de type 'h5'
        const cardTitle = document.createElement("h5");

        // Récupère le titre de la fiche et l'ajoute à l'élément 'h5'
        cardTitle.innerText = ficheElement.title;

        // Ajoute l'élément 'h5' au conteneur de carte
        cardDiv.appendChild(cardTitle);

        // Crée un nouvel élément HTML de type 'img'
        const cardImg = document.createElement("img");

        // Définit la source de l'image en fonction de l'élément 'fiche.file'
        cardImg.src = `/public/upload/img/fiche/${ficheElement.file}.png`;

        // Ajoute la classe 'img-fluid' à l'élément 'img'
        cardImg.classList.add("img-fluid");

        // Ajoute l'élément 'img' au conteneur de carte
        cardDiv.appendChild(cardImg);

        // Crée un nouvel élément HTML de type 'div'
        const cardBtn = document.createElement("div");

        // Ajoute la classe 'p-3' et 'text-center' à l'élément div
        cardBtn.classList.add("p-3", "text-center");

        // Crée un nouvel élément HTML de type 'a'
        const cardLink = document.createElement("a");

        // Définit l'attribut 'href' de l'élément 'a' en fonction de l'élément 'fiche.id'
        cardLink.href = `/fiche/view/${ficheElement.id}`;

        // Ajoute la classe 'btn' et 'btn-secondary' à l'élément 'a'
        cardLink.classList.add("btn", "btn-secondary");

        // Ajoute le texte 'Voir la fiche' à l'élément 'a'
        cardLink.innerText = "Voir la fiche";

        // Ajoute l'élément 'a' au conteneur de bouton
        cardBtn.appendChild(cardLink);

        // Ajoute l'élément 'cardBtn' au conteneur de carte
        cardDiv.appendChild(cardBtn);

        // Ajoute l'élément 'cardDiv' au conteneur de colonne
        colDiv.appendChild(cardDiv);

        // Ajoute l'élément 'colDiv' au conteneur de rangée
        row.appendChild(colDiv);
      });

      // Ajoute l'élément 'row' au conteneur 'container'
      container.appendChild(row);
    })
    .catch((error) => console.error(error));
}


window.addEventListener("DOMContentLoaded", (event) => {
    async function load_docs () {
        await last_fiche()
    }

    load_docs()
    

  
});