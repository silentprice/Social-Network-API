const express = require("express");
const router = express.Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtControllers");

// GET all thoughts
router.route("/").get(getAllThoughts).post(createThought);

// GET a specific thought by ID
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// POST a new reaction to a thought
router.route("/:thoughtId/reactions").post(createReaction);

// DELETE a reaction by ID
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
