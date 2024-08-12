// import express and mongoose
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

// Create an express server
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socialNetwork')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use the routes from the index.js file
app.use('/api', routes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
