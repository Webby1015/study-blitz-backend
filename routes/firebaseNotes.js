const express = require('express')
const router = express.Router()
const validateToken = require('../middleware/validationTokenHandler')
const {registerUser , signIn , currentuser,signOutUser,authState} = require('../controllers/firebaseAuthController')

router.use(authState);
router.get('/all',(req,res)=>{
    res.status(200).json({message:"notes is working"})
});


module.exports = router;