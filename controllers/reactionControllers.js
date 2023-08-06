const Reaction = require('../models/Reaction');
const Thought = require('../models/Thought');

exports.createReaction = async (req, res) => {
  try {
    const { reactionBody, username, thoughtId } = req.body;

    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }

    const newReaction = await Reaction.create({ reactionBody, username, thoughtId });
    thought.reactions.push(newReaction._id);

    // Save the updated thought and handle any potential errors
    try {
      await thought.save();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save reaction to thought' });
    }

    res.json(newReaction);
  } catch (error) {
    res.status(400).json({ error: 'Could not create reaction' });
  }
};

exports.deleteReactionById = async (req, res) => {
  try {
    const deletedReaction = await Reaction.findByIdAndDelete(req.params.id);
    if (!deletedReaction) {
      return res.status(404).json({ error: 'Reaction not found' });
    }

    const thought = await Thought.findById(deletedReaction.thoughtId);
    thought.reactions.pull(deletedReaction._id);

    // Save the updated thought and handle any potential errors
    try {
      await thought.save();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update thought after deleting reaction' });
    }

    res.json({ message: 'Reaction deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Could not delete reaction' });
  }
};
