const express = require('express');
const router = express.Router();
const Reaction = require('../models/Reaction');
const Thought = require('../models/Thought');

// POST a new reaction to a thought
router.post('/', async (req, res) => {
  try {
    const { reactionBody, username, thoughtId } = req.body;

    // Check if the thought exists
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    const newReaction = await Reaction.create({ reactionBody, username, thoughtId });
    thought.reactions.push(newReaction._id);
    await thought.save();

    res.json(newReaction);
  } catch (error) {
    res.status(400).json({ error: 'Could not create reaction' });
  }
});

// DELETE a reaction by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedReaction = await Reaction.findByIdAndDelete(req.params.id);
    if (!deletedReaction) {
      return res.status(404).json({ error: 'Reaction not found' });
    }

    // Remove the reaction ID from the associated thought's reactions array
    const thought = await Thought.findById(deletedReaction.thoughtId);
    thought.reactions.pull(deletedReaction._id);
    await thought.save();

    res.json({ message: 'Reaction deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Could not delete reaction' });
  }
});

module.exports = router;
