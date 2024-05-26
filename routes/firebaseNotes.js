const express = require('express')
const router = express.Router()
const {authState} = require('../controllers/firebaseAuthController')

router.use(authState);
router.get('/all',(req,res)=>{
    res.status(200).json({message:"notes is working"})
});


module.exports = router;