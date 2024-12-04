const db = require('../../../System/db')

const SearchFiche = (matiere, classe, words) => {
  return new Promise((resolve, reject) => {
    if (words) {
      db.query(
        `SELECT * FROM fiche WHERE title LIKE "${words}" `,
        (err, result) => {
          if (err) {
            throw err;
          }
          if (result) {
            console.log(result);
            let formi = JSON.stringify(result);
            let formed = JSON.parse(formi);

            resolve(formed);
          }
        }
      );
    } else
    if (matiere) {
      db.query(
        `SELECT * FROM fiche WHERE categorie='${matiere}'`,
        (err, result) => {
          if (err) {
            reject();
          }
          if (result) {
            let resultat = JSON.stringify(result);

            let formed = JSON.parse(resultat);

            resolve(formed);
          }
        }
      );
    } else
    if (classe) {
      db.query(
        `SELECT * FROM fiche WHERE classe='${classe}'`,
        (err, result) => {
          if (err) {
            reject();
          }
          if (result) {
            let resultat = JSON.stringify(result);

            let formed = JSON.parse(resultat);

            resolve(formed);
          }
        }
      );
    } else
    if (matiere && classe) {
      db.query(
        `SELECT * FROM fiche WHERE categorie='${matiere}' AND classe='${classe}'`,
        (err, result) => {
          if (err) {
            reject((err));
          }
          if (result) {
           
            let resultat = JSON.stringify(result);

            let formed = JSON.parse(resultat);

            resolve(formed);
          }
        }
      );
    }
  });
};

exports.SearchFiche = SearchFiche;
