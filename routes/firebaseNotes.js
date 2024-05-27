const express = require('express')
const router = express.Router()
const {authState} = require('../controllers/firebaseAuthController');
const { getNotes } = require('../controllers/firebaseNotesConroller');

router.use(authState);
router.get('/all',getNotes);


module.exports = router;