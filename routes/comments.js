const express = require("express");
const router = express.Router();
const {} = require("../controllers/commentsController");
const validateToken = require("../middleware/validationTokenHandler");

router.use(validateToken);
router.get('/',(req,res)=>{
    res.status(200).json({message:"comments"})
})
// router.put('/:id',deleteDiscussion)
// router.post('/',createNote)

module.exports = router;