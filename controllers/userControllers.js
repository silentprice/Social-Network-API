const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('thoughts friends');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Could not create user' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('thoughts friends');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Invalid user ID' });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: 'Could not update user' });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Could not delete user' });
  }
};

exports.addFriend = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const friendId = req.body.friendId;
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ error: 'Friend already added' });
    }

    user.friends.push(friendId);
    await user.save();

    res.json({ message: 'Friend added successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Could not add friend' });
  }
};

exports.removeFriend = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const friendId = req.params.friendId;
    if (!user.friends.includes(friendId)) {
      return res.status(400).json({ error: 'Friend not found' });
    }

    user.friends.pull(friendId);
    await user.save();

    res.json({ message: 'Friend removed successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Could not remove friend' });
  }
};
