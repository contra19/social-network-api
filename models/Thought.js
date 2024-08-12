// import mongoose and the reaction schema
const mongoose = require('mongoose');
const reactionSchema = require('./Reaction');

// create the thought schema
const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      }).format(new Date(timestamp));
    },
  },
  username: {
    type: String,
    required: true,
  },
  // use reactionSchema to create a subdocument within thoughtSchema
  reactions: [reactionSchema],
}, {
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});

// get total count of reactions on retrieval
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// create the Thought model using the thoughtSchema
const Thought = mongoose.model('Thought', thoughtSchema);
module.exports = Thought;