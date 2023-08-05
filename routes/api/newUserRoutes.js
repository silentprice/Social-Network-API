const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // For password hashing
const User = require('../models/User'); 

// Route for user registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user with the same email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or username already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add more routes for other user-related actions (e.g., login, profile updates)

module.exports = router;
