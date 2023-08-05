const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionBody: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true }, // Username of the user who reacted
  thoughtId: { type: mongoose.Schema.Types.ObjectId, ref: 'Thought', required: true },
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;

