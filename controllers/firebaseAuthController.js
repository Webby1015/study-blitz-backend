const { getAuth,createUserWithEmailAndPassword ,signInWithEmailAndPassword} = require("firebase/auth");
const { app } = require("../config/firebase");
const asyncHandler = require("express-async-handler");

const auth = getAuth(app)

const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    res.status(201).json({
      message: "User created successfully",
      data: {
        uid: user.uid,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
});


const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    res.status(201).json({
      message: "User Loggedin successfully",
      data: {
        uid: user.uid,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to Login user",
      error: error.message,
    });
  }
});

module.exports = {registerUser,signIn};
