const express = require('express');
const router = express.Router();
//const fs = require('fs');
const { SIGNUP, LOGIN } = require('../controllers/AuthController')
const checkUserData = require('../utils/middleware/checkUserData');


/**
 * save a new user
 * use the middleware checkUserData to verify the value of user data (inputs)
 */
router.post("/signup", checkUserData, SIGNUP)


/**
 * authenticate a user when requesting a connection
 * use the middleware checkUserData to verify the value of user data (inputs)
 */
router.post("/login", checkUserData, LOGIN)


module.exports = router;