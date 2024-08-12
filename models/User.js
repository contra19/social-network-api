// import mongoose
const mongoose = require('mongoose');

// create a user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'],
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
}, {
  toJSON: {
    virtuals: true,
  },
  id: false,
});

// get total count of friends on retrieval
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// create the User model using the userSchema
const User = mongoose.model('User', userSchema);
module.exports = User;
