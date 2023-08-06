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
    const userId = req.user._id; 
    const { text } = req.body;

    const newThought = await Thought.create({
      user: userId,
      text
      
    });

    res.status(201).json(newThought);
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

exports.updateThought = async (req, res) => {
  try {
    const thoughtId = req.params.id;
    const userId = req.user._id; // Assuming you have user information in req.user
    const { text } = req.body;

    const updatedThought = await Thought.findOneAndUpdate(
      { _id: thoughtId, user: userId },
      { text },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ error: 'Thought not found or not authorized' });
    }

    res.json(updatedThought);
  } catch (error) {
    res.status(400).json({ error: 'Invalid thought ID or bad request' });
  }
};

exports.deleteThought = async (req, res) => {
  try {
    const thoughtId = req.params.id;
    const userId = req.user._id; 

    const deletedThought = await Thought.findOneAndDelete({ _id: thoughtId, user: userId });

    if (!deletedThought) {
      return res.status(404).json({ error: 'Thought not found or not authorized' });
    }

    res.json({ message: 'Thought deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid thought ID or bad request' });
  }
};
