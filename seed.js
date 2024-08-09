// seed.js
const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');

mongoose.connect('mongodb://localhost:27017/socialNetwork')
  .then(() => {
    console.log('MongoDB connected');
    seedDatabase();
  })
  .catch(err => console.log(err));

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create Users
    const users = await User.insertMany([
      { username: 'aliceSmith', email: 'alice.smith@example.com' },
      { username: 'bobJohnson', email: 'bob.johnson@example.com' },
      { username: 'carlaBrown', email: 'carla.brown@example.com' },
      { username: 'davidLee', email: 'david.lee@example.com' },
      { username: 'emmaJones', email: 'emma.jones@example.com' },
    ]);

    // Create Thoughts
    const thoughts = await Thought.insertMany([
      {
        thoughtText: "Excited for the weekend! Any plans?",
        username: 'aliceSmith',
        reactions: [
          { reactionBody: 'Absolutely! Going hiking.', username: 'bobJohnson' },
          { reactionBody: 'Not sure yet, might just relax.', username: 'carlaBrown' },
        ],
      },
      {
        thoughtText: "Just finished a great book. Highly recommend!",
        username: 'bobJohnson',
        reactions: [
          { reactionBody: 'What’s the title? Always looking for good reads!', username: 'emmaJones' },
        ],
      },
      {
        thoughtText: "Learning to cook a new recipe today. Wish me luck!",
        username: 'carlaBrown',
        reactions: [
          { reactionBody: 'You got this! Cooking is so rewarding.', username: 'davidLee' },
          { reactionBody: 'Can’t wait to see how it turns out.', username: 'aliceSmith' },
        ],
      },
      {
        thoughtText: "Working on a new project at work. Feeling motivated!",
        username: 'davidLee',
        reactions: [
          { reactionBody: 'Go crush it!', username: 'bobJohnson' },
        ],
      },
      {
        thoughtText: "Finally taking some time to relax and recharge.",
        username: 'emmaJones',
        reactions: [
          { reactionBody: 'So important. Enjoy!', username: 'carlaBrown' },
          { reactionBody: 'Much needed. Rest up!', username: 'davidLee' },
        ],
      },
    ]);

    // Associate thoughts with users
    await User.findByIdAndUpdate(users[0]._id, { $push: { thoughts: thoughts[0]._id } });
    await User.findByIdAndUpdate(users[1]._id, { $push: { thoughts: thoughts[1]._id } });
    await User.findByIdAndUpdate(users[2]._id, { $push: { thoughts: thoughts[2]._id } });
    await User.findByIdAndUpdate(users[3]._id, { $push: { thoughts: thoughts[3]._id } });
    await User.findByIdAndUpdate(users[4]._id, { $push: { thoughts: thoughts[4]._id } });

    // Add friends to users
    await User.findByIdAndUpdate(users[0]._id, { $addToSet: { friends: [users[1]._id, users[2]._id] } });
    await User.findByIdAndUpdate(users[1]._id, { $addToSet: { friends: [users[0]._id, users[3]._id] } });
    await User.findByIdAndUpdate(users[2]._id, { $addToSet: { friends: [users[0]._id, users[4]._id] } });
    await User.findByIdAndUpdate(users[3]._id, { $addToSet: { friends: [users[1]._id, users[4]._id] } });
    await User.findByIdAndUpdate(users[4]._id, { $addToSet: { friends: [users[2]._id, users[3]._id] } });

    console.log('Database seeded with legit-looking data!');
  } catch (err) {
    console.log(err);
  } finally {
    mongoose.connection.close();
  }
};
