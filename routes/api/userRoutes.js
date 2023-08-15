const express = require('express');
const router = express.Router();
const userControllers = require('../../controllers/userControllers');

// GET all users
router.get('/', userControllers.getAllUsers);

// POST a new user
router.post('/', userControllers.createUser);

// GET a specific user by ID
router.get('/:userId', userControllers.getUserById);

// PUT (update) a specific user by ID
router.put('/:userId', userControllers.updateUserById);

// DELETE a specific user by ID
router.delete('/:userId', userControllers.deleteUserById);

// POST (add) a friend to a user's friend list
router.post('/:userId/friends', userControllers.addFriend);

// DELETE a friend from a user's friend list
router.delete('/:userId/friends/:friendId', userControllers.removeFriend);

module.exports = router;
