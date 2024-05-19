const express = require('express');
const router = express.Router();
const { registerUser, loginUser, currentUser } = require('../controllers/userController');
// const validateToken = require('../middleware/validateTokenHandler');

router.post('/register',registerUser)

router.post('/login',(req,res)=>{
    res.status(200).json({message:"this is login "})
})

router.get('/current-user',(req,res)=>{
    res.status(200).json({message:"this is current user "})
})

module.exports = router;
