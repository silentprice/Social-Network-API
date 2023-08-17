const { Thought, User } = require('../models');

const thoughtControllers = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().populate('reactions');
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve thoughts' });
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id).populate('reactions');
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      res.status(400).json({ error: 'Invalid thought ID' });
    }
  },

  createThought: async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      // Add the created thought's _id to the associated user's thoughts array
      const user = await User.findById(newThought.userId);
      user.thoughts.push(newThought._id);
      await user.save();
      res.json(newThought);
    } catch (error) {
      res.status(400).json({ error: 'Could not create thought' });
    }
  },

  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (error) {
      res.status(400).json({ error: 'Could not update thought' });
    }
  },

  deleteThought: async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.id);
      if (!deletedThought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
      // Remove the deleted thought's _id from the associated user's thoughts array
      const user = await User.findById(deletedThought.userId);
      user.thoughts.pull(deletedThought._id);
      await user.save();
      res.json({ message: 'Thought deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Could not delete thought' });
    }
  },

  createReaction: async (req, res) => {
    
  },

  deleteReaction: async (req, res) => {
    
  }
};

module.exports = thoughtControllers;
