const express = require('express');
const router = express.Router();
const fs = require('fs');
const sauce_Controller = require('../controllers/SauceController');
const auth = require('../middleware/auth');


/**
 * récupère toutes les sauces
 */
router.get("/", auth,  sauce_Controller.GETSAUCES)


/**
 * capture et enregistre la sauce
 */
 router.post("/", auth,  sauce_Controller.SAVESAUCE)


/**
 * récupère la sauce demandée via son identifiant
 */
 router.get("/:id", auth,  sauce_Controller.GETSAUCE)

 /**
 * met à jour la sauce
 */
  router.put("/:id", auth,  sauce_Controller.UPDATESAUCE)


 /**
 * supprime la sauce
 */
   router.delete("/:id", auth,  sauce_Controller.DELETESAUCE)


 /**
 * l'utilisateur aime ou n'aime pas la sauce la sauce
 */
   router.post("/:id/like", auth,  sauce_Controller.LIKESAUCE) 


module.exports = router;