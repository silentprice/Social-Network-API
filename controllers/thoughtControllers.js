const Thought = require('../models/Thought');

exports.getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().populate('reactions');
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve thoughts' });
  }
};

exports.createThought = async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    res.json(newThought);
  } catch (error) {
    res.status(400).json({ error: 'Could not create thought' });
  }
};

exports.getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id).populate('reactions');
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    res.status(400).json({ error: 'Invalid thought ID' });
  }
};

// Other thought-related controller functions (update, delete, etc.)
