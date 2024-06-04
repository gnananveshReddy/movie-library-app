const mongoose = require('mongoose');

const MovieListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movies: [{
    type: String // Assuming you store movie IDs or some unique identifier
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MovieList', MovieListSchema);
