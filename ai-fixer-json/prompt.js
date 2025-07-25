module.exports = (data) => {
  return `
You're an expert SEO assistant.

Based on the current SEO content and trending keywords, rewrite the title, description, and keywords to be highly optimized for search engines.

Only respond in *strict JSON* format. Do NOT explain or add any extra text.

Current SEO:
Title: ${data.title}
Description: ${data.description}
Keywords: ${data.keywords}

Trending Keywords:
${data.trends.map(t => `${t.query} (${t.value})`).join(', ')}

Respond ONLY with:
{
  "title": "Your new SEO title",
  "description": "Your optimized SEO description",
  "keywords": "comma, separated, relevant, SEO, keywords"
}
`;
};
