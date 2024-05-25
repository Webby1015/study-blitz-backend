const express = require('express')
const router = express.Router()
const {authState} = require('../controllers/firebaseAuthController');
const { getDiscussions } = require('../controllers/firebaseDiscussionsController');

router.use(authState);
router.get('/all',getDiscussions);


module.exports = router;