const express = require('express');
const dotenv = require('dotenv');
const { generateFix } = require('./gemini');

dotenv.config();
const app = express();
app.use(express.json());

app.post('/fix', async (req, res) => {
  const input = req.body;
  try {
    const fixed = await generateFix(input);
    res.json(fixed);
  } catch (error) {
    console.error('Fix generation error:', error.message);
    res.status(500).json({ error: 'Gemini Fix Failed' });
  }
});

app.listen(6010, () => {
  console.log('AI Fixer running on http://localhost:6010');
});
