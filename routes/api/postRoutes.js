// postRoutes.js
const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin'); // Custom middleware to check admin status
const Post = require('../models/Post');
const Reaction = require('../models/Reaction');

// Route for an admin to post an image
router.post('/post', isAdmin, async (req, res) => {
  try {
    const adminId = req.admin._id; // Assuming you have admin information in req.admin
    const { image } = req.body;

    const newPost = new Post({
      admin: adminId,
      image
      // Other post details
    });

    await newPost.save();

    res.status(201).json({ message: 'Post created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for users to react to a post
router.post('/react/:postId', async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have user information in req.user
    const postId = req.params.postId;
    const { reactionType } = req.body;

    const newReaction = new Reaction({
      user: userId,
      post: postId,
      reactionType
    });

    await newReaction.save();

    res.status(201).json({ message: 'Reaction added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
