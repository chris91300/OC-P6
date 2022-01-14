const express = require('express');
const router = express.Router();
const fs = require('fs');
const { GETSAUCES, SAVESAUCE, GETSAUCE, UPDATESAUCE, DELETESAUCE, LIKESAUCE } = require('../controllers/SauceController');
const auth = require('../utils/middleware/auth');
const upload = require('../utils/middleware/upload');
const canIDo = require('../utils/middleware/canIDo');
const checkSauceData = require('../utils/middleware/checkSauceData');


/**
 * get all the sauces
 */
router.get("/", auth, GETSAUCES)


/**
 * save the user's new sauce
 */
 router.post("/", auth, upload, checkSauceData, SAVESAUCE)


/**
 * get the sauce with the id 
 */
 router.get("/:id", auth, GETSAUCE)

 /**
 * update the sauce
 */
  router.put("/:id", auth, canIDo, upload, checkSauceData, UPDATESAUCE)


 /**
 * delete the sauce
 */
   router.delete("/:id", auth, canIDo, DELETESAUCE)


 /**
  * record if the user like or dislike the sauce
 * l'utilisateur aime ou n'aime pas la sauce la sauce
 */
   router.post("/:id/like", auth, LIKESAUCE) 


module.exports = router;