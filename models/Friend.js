const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

const Friends = mongoose.model('Friends', friendsSchema);

module.exports = Friends;
