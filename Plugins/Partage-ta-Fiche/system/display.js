const db = require("../../../System/db");

const displayfiche = (callback) => {
  db.query("SELECT * FROM fiche ORDER BY `fiche`.`id` DESC LIMIT 3  ", (err, result) => {
    if (err) {
      throw err;
    }
    if (result) {
      let formed = JSON.stringify(result);
      let reformed = JSON.parse(formed);

      callback(reformed);
    }
  });
};
exports.fiche = displayfiche;

const displayOnefiche = (id, callback) => {

  let SQL = `SELECT * FROM fiche WHERE id="${id}"` 
  db.query(SQL, (err, result) => {
      if (err) {throw err}
      if (result) {
          let formi = JSON.stringify(result)
          let formed = JSON.parse(formi)
          callback(formed)
      }
  })

}
exports.displayOnefiche = displayOnefiche

const displayProfileFiche = (id, callback) => {
  let SQL = `SELECT * FROM fiche WHERE authorID="${id}"`
  db.query(SQL, (err, result) => {
      if (err) {throw err}
      if (result) {
          const formi = JSON.stringify(result)
          const formed = JSON.parse(formi)
          callback(formed)
      }
  })
}

exports.displayProfileFiche = displayProfileFiche
const displayProfile = (id, result) => {
  let SQL = `SELECT * FROM user WHERE id = ${id}`
  db.query(SQL, (err, resultat  ) => {
      if (err) {throw err}
      if (resultat ) {
          const formi = JSON.stringify(resultat)
          const formed = JSON.parse(formi)
          result(formed)


      }
  })
}

exports.displayProfile = displayProfile

const diplay_classe = async (resultat) => {
  db.query('SELECT * FROM classe', (err, result) => {
    if (err) {
      throw err
    }
    if (result) {
      resultat(result)
    }
  }) 

}

exports.display_classe = diplay_classe
const diplay_categorie = async (resultat) => {
  db.query('SELECT * FROM categorie', (err, result) => {
    if (err) {
      throw err
    }
    if (result) {
      resultat(result)
    }
  }) 

}
exports.diplay_categorie = diplay_categorie
