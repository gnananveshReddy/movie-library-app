// server.js or index.js

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors());

// Movie list schema and model
const movieListSchema = new mongoose.Schema({
  name: String,
  isPublic: Boolean,
});

const MovieList = mongoose.model('MovieList', movieListSchema);

// API endpoint for getting movie lists
app.get('/api/movielists', async (req, res) => {
  try {
    const lists = await MovieList.find();
    res.json(lists);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// API endpoint for creating a movie list
app.post('/api/movielists', async (req, res) => {
  const { name, isPublic } = req.body;
  try {
    const newList = new MovieList({ name, isPublic });
    await newList.save();
    res.status(201).json(newList);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
