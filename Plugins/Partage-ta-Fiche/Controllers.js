const db = require('../../System/db')
const fs = require('fs')
const env = require('../../var')
const config = require('../../config.json')
const CheckingFile = require('./system/cheking_file')
const display = require('./system/display')
const {SearchFiche}= require('./system/search')


const themes = require(`../../Themes/${config.theme}/theme.js`)

exports.post_fiche = (req,res) => {


    
    let data = {
        title: req.body.title,
        description: req.body.desc,
        categorie: req.body.categorie,
        classe: req.body.classe,
        author: req.session.username,
        authorID: req.session.userID,
        file: req.file.filename
        
    }

    if (fs.existsSync(`${env.dirname}/public/upload/img/fiche/${req.file.filename}`)) {
        if (req.body.title === "" || req.body.desc === "" || req.session.username === undefined) {

            res.status(503).render(themes.error_path , {
                theme_header: themes.header
            }); 
            fs.unlinkSync(`${env.dirname}/public/upload/img/fiche/${req.file.filename}`, (err) => {
                console.error('Can\'t delete file' + err)
            })
            

        } else {
            db.query('INSERT INTO fiche SET ? ', data, (err, result) => {
                if (err) {

                    res.status(503).render(themes.error_path , {
                        theme_header: themes.header
                    }); 

                    fs.unlinkSync(`${env.dirname}/public/upload/img/fiche/${req.file.filename}`, (err) => {
                        console.error('Can\'t delete file' + err)
                    })


                    console.error(err)
                }
                if (result) {
                    fs.rename(`${env.dirname}/public/upload/img/fiche/${req.file.filename}`, `${env.dirname}/public/upload/img/fiche/${req.file.filename}.png`, (err) => {
                        console.error('Can\'t rename file' + err)
                    })
                    console.log('Sucess rename file')
                    const id = result.insertId
                    res.redirect('/fiche/view/'+ id)
                }
            })
        }
        
            
        
    }


}







exports.view_fiche = (req, res ) => {
    const ficheID = req.params.id
    display.displayOnefiche(ficheID, (resultat) => {
        const result = resultat[0]
        if (result === 0 ) {
            res.status(404).render(themes.error_path , {
                theme_header: themes.header
            }); 

        } else {
            CheckingFile.CheckingPP(result.authorID)
            .then((img) => {
                res.render(themes.fiche, {
                    fiche: result,
                    img: img,
                    theme_header: themes.header
        
        
        
                }) 

            })
            .catch((img) => {
                res.render(themes.fiche, {
                    fiche: result,
                    img: img, 
                    theme_header: themes.header
        
        
        
                }) 
            })
            
        }

    })


}


exports.view_profile = (req,res) => {

    const userID = req.params.id
    display.displayProfileFiche(userID, (callback) => {
        display.displayProfile(req.params.id, (resultat) => {
          const  result = resultat[0]
            
           
            if (result) {
                
                    
                        
                    res.render(themes.view_profile, {
                        user: result, 
                        fiche: callback,
                     img: result.ppfile,
                     theme_header: themes.header
                     
                            
    
                    }) 
             
    
    
            } else {
                res.render(themes.error_path, {
                    theme_header : themes.header
                })
            }
        })

    })

}

exports.search_view = async (req,res) => {
    res.render(themes.search, {
        theme_header: themes.header
    })
}

exports.search = async (req,res) => {
    
    let matiere = req.body.matiere
    let classe = req.body.classe 

    if (matiere) {
        SearchFiche(matiere).then((fiche) => {
            res.render(themes.search_view, {
                theme_header : themes.header,
                fiche: fiche
            })
        })

    } else if (classe) {
        SearchFiche("", classe).then((fiche) => {
            res.render(themes.search_view, {
                theme_header : themes.header,
                fiche: fiche
            })
            
        })

    } else if (matiere && classe) {
        SearchFiche(matiere, classe).then((fiche) => {
            res.render(themes.search_view, {
                theme_header : themes.header,
                fiche: fiche
            })
        })

    }
    

    

}