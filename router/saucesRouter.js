const express = require('express');
const router = express.Router();
const fs = require('fs');
const { GETSAUCES, SAVESAUCE, GETSAUCE, UPDATESAUCE, DELETESAUCE, LIKESAUCE } = require('../controllers/SauceController');
const authorization = require('../utils/middleware/authorization');
const upload = require('../utils/middleware/upload');
const canIDo = require('../utils/middleware/canIDo');
const checkSauceData = require('../utils/middleware/checkSauceData');
const resize = require('../utils/middleware/resize');
const checkSauceId = require('../utils/middleware/checkSauceId');
const checkUserId = require('../utils/middleware/checkUserId');


/**
 * get all the sauces
 */
router.get("/", authorization, GETSAUCES)


/**
 * save the user's new sauce
 */
 router.post("/", authorization, upload, checkSauceData, resize,  SAVESAUCE)


/**
 * get the sauce with the id 
 */
 router.get("/:id", authorization, checkSauceId, GETSAUCE)

 /**
 * update the sauce
 */
  router.put("/:id", authorization, checkSauceId, canIDo, upload, checkSauceData, resize, UPDATESAUCE)


 /**
 * delete the sauce
 */
   router.delete("/:id", authorization, checkSauceId, canIDo, DELETESAUCE)


 /**
  * update if the user like or dislike the sauce
 */
   router.post("/:id/like", authorization, checkSauceId, checkUserId, LIKESAUCE) 


module.exports = router;