const express = require('express')
const router = express.Router()
const get_number = require('../system/get_number')
const display = require('../system/display')

router.get('/usernumber', (req, res) => {
    get_number.getUserNumber((usernumber) => {
        let json = {
            title: 'Partage ta Fiche Api ', 
            response: usernumber
        }
        
        res.json(json)
        
      });

})

router.get('/fichenumber', (req,res )=> {
    get_number.getFicheNumber((fichenumber) => {
        let json = {
            title: 'Partage ta Fiche Api ',
            response: fichenumber
        }
        
        res.json(json)

        
    })
})

router.get('/last', (req,res) => {
    display.fiche((fiche) => {
        res.json(fiche)
    })

})

router.get('/classe', (req,res) => {
    display.display_classe((result) => {
        res.json(result)
    })

})
router.get('/categorie', (req,res) => {
    display.diplay_categorie((result) => {
        res.json(result)
    })

})


module.exports = router