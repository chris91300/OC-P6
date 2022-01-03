const express = require('express');
const router = express.Router();
const fs = require('fs');
const auth_Controller = require('../controllers/AuthController')


/**
 * enregistre un nouvel utilisateur
 */
router.post("/signup", auth_Controller.SIGNUP)


/**
 * authentifie un utilisateur
 */
router.post("/login", auth_Controller.LOGIN)


module.exports = router;