const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/search', async (req, res) => {
  const { title } = req.query;

  try {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${title}`);
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
