const express = require('express');
const router = express.Router();
const axios = require('axios');

// Other routes...
router.post('/fix', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:6010/fix', req.body);
    res.json(response.data);
  } catch (err) {
    console.error('Fix Error:', err.message);
    res.status(500).json({ error: 'Failed to fix SEO' });
  }
});

module.exports = router;
