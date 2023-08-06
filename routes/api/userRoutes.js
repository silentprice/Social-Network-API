const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // For password verification
const User = require('../models/User'); 

// Route for user login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Handle successful login
    res.json({ message: 'Logged in successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
