const data = require("../../../System/getdata");
const { displayOnefiche } = require("../system/display");
const plugin = data.plugins;
const get = require("../system/get_number");
const fs = require('fs').promises
const env = require('../../../var')
const db = require('../../../System/db')
exports.index = (req, res) => {
  get.getFicheNumber((fiche) => {
    res.render(__dirname + "/View/index", {
      fiche_number: fiche,
      plugins: plugin,
      req: req,
    });
  });
};

exports.categorie_view = async (req,res) => {
  try {
    const categorie = await db.awaitQuery('SELECT * FROM categorie')
    const classe = await db.awaitQuery('SELECT * FROM classe')
   

    res.render(__dirname + '/View/categorie', {
      categorie: categorie,
      classe: classe,
      plugins: plugin
    })

  }
  catch (error) {
    console.error(error)
  }
}


exports.categorie_delete = async (req,res) => {
  try  {
    await db.awaitQuery(`DELETE FROM categorie WHERE id = "${req.body.categorie}"`)
    res.redirect('/admin/fiche/categorie/')

  } catch (error) {
    console.error(error)

  }
}
exports.classe_delete = async (req,res) => {
  try  {
    await db.awaitQuery(`DELETE FROM classe WHERE id = "${req.body.classe}"`)
    res.redirect('/admin/fiche/categorie/')

  } catch (error) {
    console.error(error)

  }
}


exports.categorie_add = async (req,res) => {
  try {
    let data = {
      name: req.body.categorie
    }
    await db.awaitQuery('INSERT INTO categorie SET ?', data)
    res.redirect('/admin/fiche/categorie')

  } 
  catch (error) {
    console.error(error)
  }
  

}
exports.categorie_classe_add = async (req,res) => {
  try {
    let data = {
      classe: req.body.classe
    }
    await db.awaitQuery('INSERT INTO classe SET ?', data)
    res.redirect('/admin/fiche/categorie')

  } 
  catch (error) {
    console.error(error)
  }
  

}

exports.moderate = (req, res) => {
  res.render(__dirname + "/View/moderate_home", {
    plugins: plugin,
    req: req,
  });
};

exports.moderate_view = (req,res) => {
    displayOnefiche(req.body.fiche_id, (callback) => {
        let [fiche] = callback
        res.render(__dirname + '/View/moderate', {
            plugins : plugin, 
            req: req, 
            fiche: fiche
        })
    })
}

exports.delete = async (req,res) => {
  try{
  let SQL = `DELETE FROM fiche WHERE id = "${req.params.id}"`
  const [result] = await db.awaitQuery('SELECT * FROM fiche WHERE id = "' + req.params.id + '"')
  const file = result.file 
   await db.awaitQuery(SQL) 
   await fs.unlink(env.dirname + '/public/upload/img/fiche/'+ file + '.png')
   res.redirect('/admin/fiche/moderate/')
  }
   catch(error) {
    console.error(error)
    res.send('Erreur')
   }
}

//Penser à ajouter dans le rendu des pages la variables plugin
