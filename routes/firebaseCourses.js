const express = require('express')
const router = express.Router()
const {authState} = require('../controllers/firebaseAuthController')

router.use(authState);
router.get('/',(req,res)=>{
    res.status(200).json({message:"courses is working"})
});

module.exports = router;