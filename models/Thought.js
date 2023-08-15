const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
  },
  username: {
    type: String,
    required: true
  },
  reactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reaction'
    }
  ]
});

// Define a virtual field 'reactionCount' to retrieve the length of 'reactions' array
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Define a getter method to format the timestamp
const dateFormat = timestamp => {
  return new Date(timestamp).toLocaleDateString();
};

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
