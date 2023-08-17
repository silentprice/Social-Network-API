const express = require('express');
const router = express.Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtControllers');

// GET all thoughts
router.get('/', getAllThoughts);

// GET a specific thought by ID
router.get('/:id', getThoughtById);

// POST a new thought
router.post('/', createThought);

// PUT (update) a specific thought by ID
router.put('/:id', updateThought);

// DELETE a specific thought by ID
router.delete('/:id', deleteThought);

// POST a new reaction to a thought
router.post('/:thoughtId/reactions', createReaction);

// DELETE a reaction by ID
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;
