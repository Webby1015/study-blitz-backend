const express = require('express');
const router = express.Router();
const { registerUser, loginUser, currentUser } = require('../controllers/userController');
const validateToken = require('../middleware/validationTokenHandler')

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/current-user',validateToken,currentUser)

module.exports = router;
