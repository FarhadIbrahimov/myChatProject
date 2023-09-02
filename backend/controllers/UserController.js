// Import the necessary modules and dependencies
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const generateToken = require("../config/generateToken"); // Import a function to generate tokens

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});
// Define a function that handles user registration
const registerUser = asyncHandler(async (req, res) => {
  // Extract necessary information from the request body
  const { name, email, password, pic } = req.body;

  // Check if required fields are missing
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the fields");
  }

  // Check if a user with the same email already exists
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create a new user record in the database
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  // Check if user creation was successful
  if (user) {
    // If successful, send a response with user details and a token
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id), // Generate and include a token for authentication
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create the user"); // Throw an error if user creation fails
  }
});

// Define a function to handle user authentication
const authUser = asyncHandler(async (req, res) => {
  // Extract email and password from the form fields in the request
  const { email, password } = req.body;

  // Find a user in the database using the provided email
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // If the user exists, respond with user details and a token
    res.status(201);
    res.json({
      _id: user.id, // User's unique ID
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id), // Generate and include a token for authentication
    });
  } else {
    res.status(401);
    throw new Error("Invalid ID or Password");
  }
});

module.exports = { allUsers, registerUser, authUser };
