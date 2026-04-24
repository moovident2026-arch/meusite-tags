<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);

=======
const router = require("express").Router();
const { register } = require("./auth.controller");

router.post("/register", register);

>>>>>>> e89eb6421e468d50ea3f326b51dc1eb7e3768805
module.exports = router;