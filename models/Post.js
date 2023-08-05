// Post Model
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  image: {
    type: String,
    required: true
  },
  // Other fields for post details
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

// Reaction Model
const reactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  reactionType: {
    type: String,
    enum: ['like', 'heart', 'smile'],
    required: true
  }
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;
