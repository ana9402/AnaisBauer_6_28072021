// IMPORTATIONS ----------
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const passwordValidation = require('../middleware/passwordValidation')
const rateLimiter = require('../middleware/rate-limiter');

// ROUTES ----------
router.post('/signup', passwordValidation, userCtrl.signup);
router.post('/login', rateLimiter, userCtrl.login);


// EXPORTATION ----------
module.exports = router;