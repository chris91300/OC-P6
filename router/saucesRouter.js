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
 * middleware autorization  =>   => verify the token in the header authorization
 */
router.get("/", authorization, GETSAUCES)


/**
 * save the user's new sauce
 * middleware autorization  =>   =>  verify the token in the header authorization
 * middleware upload  =>  get FILE come from to the form multi part data
 * middleware checkSauceData  =>  verify the form fields
 * middleware resize  =>  modify the dimension about the image and compress it
 */
 router.post("/", authorization, upload, checkSauceData, resize,  SAVESAUCE)


/**
 * get the sauce with the id
 * middleware autorization  =>   =>  verify the token in the header authorization
 * middleware checkSauceId  =>   =>  verify the format of the sauce id sended in the parameters
 */
 router.get("/:id", authorization, checkSauceId, GETSAUCE)

 /**
 * update the sauce
 * middleware autorization  =>   =>  verify the token in the header authorization
 * middleware checkSauceId  =>   =>  verify the format of the sauce id sended in the parameters
 * middleware canIDo  =>   =>  compare the user id and the userId sauce in order to be sure is the same
 * middleware upload  =>  get FILE come from to the form multi part data
 * middleware resize  =>  modify the dimension about the image and compress it
 * middleware checkSauceData  =>  verify the form fields
 */
  router.put("/:id", authorization, checkSauceId, canIDo, upload, checkSauceData, resize, UPDATESAUCE)


 /**
 * delete the sauce
 * middleware autorization  =>  verify the token in the header authorization
 * middleware checkSauceId  =>  verify the format of the sauce id sended in the parameters
 * middleware canIDo  =>  compare the user id and the userId sauce in order to be sure is the same
 */
   router.delete("/:id", authorization, checkSauceId, canIDo, DELETESAUCE)


 /**
  * update if the user like or dislike the sauce
  * middleware autorization =>  verify the token in the header authorization
  * middleware checkSauceId  =>  verify the format of the sauce id sended in the parameters
  * middleware checkUserId =>  verify the format of the user id sended in the parameters
 */
   router.post("/:id/like", authorization, checkSauceId, checkUserId, LIKESAUCE) 


module.exports = router;