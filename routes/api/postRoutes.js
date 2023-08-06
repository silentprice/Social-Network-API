const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

// Route for users to create a new thought
router.post('/thoughts', async (req, res) => {
  try {
    const userId = req.user._id; 
    const { text } = req.body;

    const newThought = new Thought({
      user: userId,
      text
      
    });

    await newThought.save();

    res.status(201).json({ message: 'Thought created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for users to react to a thought
router.post('/reactions/:thoughtId', async (req, res) => {
  try {
    const userId = req.user._id;
    const thoughtId = req.params.thoughtId;
    const { reactionType } = req.body;

    const newReaction = new Reaction({
      user: userId,
      thought: thoughtId,
      reactionType
    });

    await newReaction.save();

    res.status(201).json({ message: 'Reaction added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
