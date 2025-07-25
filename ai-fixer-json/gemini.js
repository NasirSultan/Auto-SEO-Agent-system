require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const prompts = require('./prompt');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function generateFix(data) {
  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
  const prompt = prompts(data);
  const result = await model.generateContent(prompt);
  const text = await result.response.text();
  return { suggestion: text };
}

module.exports = { generateFix };
