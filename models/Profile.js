const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  // Add more fields relevant to the user's profile
  // Examples: bio, profile image, friends list, etc.
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
