const express = require("express");
const router = express.Router();
const {getDiscussions,createDiscussion,deleteDiscussion} = require("../controllers/discussionsController");
const validateToken = require("../middleware/validationTokenHandler");

router.use(validateToken);
router.get('/',getDiscussions)
router.post('/',createDiscussion)
// router.put('/:id',deleteDiscussion)
// router.post('/',createNote)

module.exports = router;