module.exports = (data) => {
  return `
You are an SEO expert. Given the audit and trending keywords, suggest the most optimized fixes for missing or weak <title>, <meta>, and <h1> tags.

Audit:
Title: ${data.audit.title}
Meta: ${data.audit.meta}
H1: ${data.audit.h1 || 'Missing'}

Trending Keywords:
${data.trends.map(t => `${t.query} (${t.value})`).join(', ')}

Respond in this JSON format:
{
  "title": "...",
  "meta": "...",
  "h1": "..."
}
`;
};
