const express = require('express')
const router = express.Router()
const validateToken = require('../middleware/validationTokenHandler')
const firebaseAuthRegisterController = require('../controllers/firebaseAuthRegisterController')

// router.use(validateToken);
router.post('/register',firebaseAuthRegisterController);

module.exports = router;