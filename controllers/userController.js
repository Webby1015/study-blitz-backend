const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res, next) => {
    const { name, collage, course, major, year, about, email, password } = req.body;
  
    // Check if all fields are provided
    if (!name || !collage || !course || !major || !year || !about || !email || !password) {
      return next(new Error("All fields are mandatory"));
    }
  
    try {
      // Check if the user already exists
      const userExists = await userModel.findOne({ email });
      if (userExists) {
        return next(new Error("Email already exists"));
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the user
      const user = await userModel.create({
        name,
        collage,
        course,
        major,
        year,
        about,
        email,
        password: hashedPassword,
      });
  
      // Return success response
      res.status(201).json({
        message: "User created successfully",
        data: {
          _id: user.id,
          name: user.name,
          collage: user.collage,
          course: user.course,
          major: user.major,
          year: user.year,
          about: user.about,
          email: user.email,
        },
      });
    } catch (error) {
      // Handle any unexpected errors
      return next(error);
    }
  });
  

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if both fields are provided
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  // Find the user by email
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // Compare the passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // Generate JWT
  const accessToken = jwt.sign(
    {
      message: "Logged in successfully",
      data: {
        name: user.name,
        collage: user.collage,
        course: user.course,
        major: user.major,
        year: user.year,
        about:user.about,
        email: user.email,
        id: user.id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2h" } // 2 hours
  );

  // Send response
  res.status(200).json({ message:"Logged in Successfully",accessToken:accessToken });
});

const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Current user information",
    data: req.user,
  });
});

module.exports = { registerUser, loginUser, currentUser };
