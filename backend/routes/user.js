// importing express
const express = require("express");

// creating an instance of the express router
const router = express.Router();

// controller functions
const {loginUser, signupUser} = require('../controllers/userController')

// login routes
router.post("/login", loginUser);

// signup routes
router.post("/signup", signupUser);


module.exports = router;
