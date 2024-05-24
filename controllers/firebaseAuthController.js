const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut 
} = require("firebase/auth");
const { app } = require("../config/firebase");
const asyncHandler = require("express-async-handler");

const auth = getAuth(app);

const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
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

const currentuser = asyncHandler(async (req, res, next) => {
  try {
    // Check if there is a current user
    const user = auth.currentUser;
    if (user) {
      // User is authenticated, return user information
      res.status(200).json({
        message: "User is logged in",
        data: {
          uid: user.uid,
          email: user.email,
        },
      });
    } else {  
      // No user is authenticated
      res.status(401).json({
        message: "No user is logged in",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to check authentication state",
      error: error.message,
    });
  }
});

const authState = asyncHandler(async (req, res, next) => {
  try {
    const user = auth.currentUser;
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({
        message: "Unauthorized access. Please sign in.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to check authentication state",
      error: error.message,
    });
  }
});

const signOutUser = asyncHandler(async (req, res, next) => {
  try {
    await signOut(auth);
    res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to sign out user",
      error: error.message,
    });
  }
});

module.exports = { registerUser, signIn, currentuser ,signOutUser ,authState};
