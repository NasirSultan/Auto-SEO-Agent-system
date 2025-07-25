const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { generateFix } = require('./gemini');

dotenv.config();
const app = express();
app.use(express.json());

const seoFilePath = path.join(__dirname, 'seo.json');

app.post('/fix', async (req, res) => {
  try {
    // Load current SEO
    const seoData = JSON.parse(fs.readFileSync(seoFilePath, 'utf-8'));

    // Add trends (optional from body)
    const input = {
      ...seoData,
      trends: req.body.trends || [
        { query: "AI SEO", value: 80 },
        { query: "React SEO", value: 70 },
        { query: "Gemini AI", value: 60 }
      ]
    };

    // Generate optimized SEO
    const fixed = await generateFix(input);

    // Save it back to file
    fs.writeFileSync(seoFilePath, JSON.stringify(fixed, null, 2));

    res.json({ message: '✅ SEO updated successfully', fixed });
  } catch (error) {
    console.error('Fix generation error:', error.message);
    res.status(500).json({ error: 'SEO Fix Failed' });
  }
});

app.listen(6010, () => {
  console.log('✅ AI Fixer running on http://localhost:6010');
});
