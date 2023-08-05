const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true }, // Username of the user who posted the thought
  reactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reaction',
    },
  ],
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
