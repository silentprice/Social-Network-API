const User = require('../models/User');
const Thought = require('../models/Thought');

const userControllers = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate('thoughts friends');
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('thoughts friends');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Invalid user ID' });
    }
  },

  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (error) {
      res.status(400).json({ error: 'Could not create user' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: 'Could not update user' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Remove the user's associated thoughts
      await Thought.deleteMany({ username: deletedUser.username });

      res.json({ message: 'User and associated thoughts deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Could not delete user' });
    }
  },

  addFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Could not add friend' });
    }
  },

  removeFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.params;
      const user = await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Could not remove friend' });
    }
  }
};

module.exports = userControllers;
