const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  // Add more fields relevant to the user's profile
  // Examples: profile image, bio, friends list, etc.
});

const User = mongoose.model('User', userSchema);

module.exports = User;
