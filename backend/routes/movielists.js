const express = require('express');
const MovieList = require('../models/MovieList');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/movielists', authenticate, async (req, res) => {
    const { name, isPublic } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'List name is required' });
      }
    
      try {
        // Create a new movie list document
        const newList = new MovieList({ name, isPublic, user: req.user.id });
        await newList.save();
    
        // Send back the created list
        res.status(201).json(newList);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
    });
    
    module.exports = router;
