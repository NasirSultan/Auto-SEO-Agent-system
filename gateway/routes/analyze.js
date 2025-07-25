const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:5001/analyze', req.body);
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'SEO analysis failed', detail: error.message });
  }
});

module.exports = router;
