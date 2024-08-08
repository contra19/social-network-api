const router = require('express').Router();
const User = require('../models/User');

// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new user
router.post('/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT to update a user
router.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a user
router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a friend
router.post('/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.friends.push(req.params.friendId);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a friend
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.friends.pull(req.params.friendId);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
