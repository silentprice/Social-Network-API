
const Reaction = require('../models/Reaction');
const Thought = require('../models/Thought');
const express = require('express');
const router = express.Router();
const reactionControllers = require('../controllers/reactionControllers');

// POST a new reaction to a thought
router.post('/', reactionControllers.createReaction);

// DELETE a reaction by ID
router.delete('/:reactionId', reactionControllers.deleteReactionById);

module.exports = router;
