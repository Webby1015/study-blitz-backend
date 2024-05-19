const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, collage, course, major, year, email, password } = req.body;
  if (!name || !collage || !course || !major || !year || !email || !password) {
    res.status(400);
    throw new Error("All Fields Are Mandatory");
  } else {
    const userAvailable = await userModel.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error("Email Already Exists");
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await userModel.create({
        name: name,
        collage: collage,
        course: course,
        major: major,
        year: year,
        email: email,
        password: hashPassword,
      });
      if (user) {
        res.status(201).json({
          message: "User Created",
          data: {
            _id: user.id,
            name: user.name,
            collage: user.collage,
            course: user.course,
            major: user.major,
            year: user.year,
            email: user.email,
          },
        });
      } else {
        res.status(400);
        throw new Error("Invalid Data");
      }
    }
  }
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }

  // Find the user by email
  const user = await userModel.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Email or Password is not valid");
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Email or Password is not valid");
  }

  // Generate JWT
  const accessToken = jwt.sign(
    {
      message: "Logged in Successfully",
      data: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "120m" }
  );

  // Send response
  res.status(200).json({ accessToken });
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message:"current user info",
  data: req.user });
});

module.exports = { registerUser, loginUser, currentUser };
