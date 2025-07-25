require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const promptTemplate = require('./prompt');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function generateFix(data) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = promptTemplate(data);

  const result = await model.generateContent(prompt);
  const response = await result.response.text();

  // Extract clean JSON from Gemini response
  const match = response.match(/\{[\s\S]*?\}/);
  if (!match) throw new Error('No valid JSON found in Gemini response');

  return JSON.parse(match[0]);
}

module.exports = { generateFix };
