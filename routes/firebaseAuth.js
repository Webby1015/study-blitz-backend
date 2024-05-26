const express = require("express");
const router = express.Router();
// const validateToken = require("../middleware/validationTokenHandler");
const {
  registerUser,
  signIn,
  currentuser,
  signOutUser,
  authState,
} = require("../controllers/firebaseAuthController");
// const firebaseAuthSigninController = require('../controllers/firebaseAuthSigninController')

// router.use(validateToken);
router.post("/register", registerUser);
router.post("/signin", signIn);
router.get("/currentuser",authState, currentuser);
router.get("/signout",authState, signOutUser);

module.exports = router;
