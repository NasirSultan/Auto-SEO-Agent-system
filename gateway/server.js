const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/analyze', require('./routes/analyze'));
app.use('/trends', require('./routes/trends'));

app.use('/fix', require('./routes/fix'));
app.use('/api/seo', require('./routes/seoRoutes'));

app.listen(PORT, () => {
  console.log(`Gateway running on http://localhost:${PORT}`);
});
