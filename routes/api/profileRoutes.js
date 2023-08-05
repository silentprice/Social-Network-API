const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile'); // Assuming you have a Profile model
const isAdmin = require('../middleware/isAdmin'); // Custom middleware to check admin status

// Route for viewing a user's profile
router.get('/:username', async (req, res) => {
  try {
    const username = req.params.username;

    // Fetch the profile data from the database
    const profile = await Profile.findOne({ username });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for editing a user's profile (assuming authentication and authorization)
router.put('/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const updatedProfileData = req.body; // Assuming request body contains updated profile data

    // Update the profile data in the database
    const updatedProfile = await Profile.findOneAndUpdate({ username }, updatedProfileData, { new: true });

    if (!updatedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add more routes for other profile-related actions (e.g., adding friends)

module.exports = router;
