const express = require('express')
const router = express.Router()
const {authState} = require('../controllers/firebaseAuthController');
const { getDiscussions, createComment,createDiscussion } = require('../controllers/firebaseDiscussionsController');


router.use(authState);
router.get('/all',getDiscussions);
// create discussion
router.post('/create',createDiscussion);
// create comment
router.post('/comment',createComment);

module.exports = router;