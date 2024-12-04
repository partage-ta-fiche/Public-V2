const express = require("express");
const router = express.Router();
const PluginInfo = require("../Partage-ta-Fiche.json");
const Controllers = require(PluginInfo.admin_controllerPath);
const securite = require("../../../System/RoleCheking");

router.get("/", securite, Controllers.index);

//Gestion des fiches
router.get("/categorie/", securite, Controllers.categorie_view);
router.post("/categorie/delete", Controllers.categorie_delete);
router.post("/categorie/classe/delete", Controllers.classe_delete);
router.post("/categorie/add/", securite, Controllers.categorie_add);
router.post(
  "/categorie/classe/add",
  securite,
  Controllers.categorie_classe_add
);

//Moderation
router.get("/moderate/", securite, Controllers.moderate);
router.post("/moderate/", securite, Controllers.moderate_view);
router.get("/delete/:id", securite, Controllers.delete);

module.exports = {
  router: router,
  route: PluginInfo.route,
  info: PluginInfo,
};
