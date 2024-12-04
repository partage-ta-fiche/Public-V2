const express = require('express')
const router = express.Router()
const PluginInfo = require('./Partage-ta-Fiche.json')
const Controllers = require(PluginInfo.controllerPath)
const Api_Router = require('./Api/Routes')
const multer = require('multer')
const env = require('../../var')

const upload_fiche = multer({ dest: env.dirname + "/public/upload/img/fiche/" });

//Visualisation
router.get('/view/:id', Controllers.view_fiche)
router.get('/user/:id', Controllers.view_profile)

//Post des fiches
router.post('/post', upload_fiche.single("file"), Controllers.post_fiche)

//Search 
router.get('/search', Controllers.search_view)
router.post('/search', Controllers.search)

//Api

router.use('/api', Api_Router)

module.exports = {
    router: router,
    route: PluginInfo.route,
    info: PluginInfo,
  };