const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function (timestamp) {
      return this.formatDate(timestamp);
    }
  }
});

// Virtual getter method to format the timestamp
reactionSchema.virtual('formattedCreatedAt').get(function () {
  return this.formatDate(this.createdAt);
});

// Method to format the timestamp
reactionSchema.methods.formatDate = function (timestamp) {
  return new Date(timestamp).toLocaleDateString();
};

module.exports = reactionSchema;
