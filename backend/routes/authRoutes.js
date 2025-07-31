const express = require('express');
const router = express.Router();
const {register, login,verifyMail,logout} = require('../controllers/authController.js');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verify', verifyMail); 

module.exports = router;
