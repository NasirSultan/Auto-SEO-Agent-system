const express = require('express');
const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');
const os = require('os');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.post('/fix-seo', async (req, res) => {
  const { repoURL, token } = req.body;

  if (!repoURL || !token) {
    return res.status(400).json({ error: 'Missing repoURL or token' });
  }

  const tempDir = path.join(os.tmpdir(), `seo-fix-${Date.now()}`);
  const secureURL = repoURL.replace('https://', `https://${token}@`);
  const git = simpleGit();

  try {
    console.log(' Cloning repo to:', tempDir);
    await git.clone(secureURL, tempDir);

    const seoDataPath = path.join(__dirname, 'seo.json');
    if (!fs.existsSync(seoDataPath)) {
      throw new Error('seo.json file not found!');
    }
    const seoData = JSON.parse(fs.readFileSync(seoDataPath, 'utf-8'));

    const clonedGit = simpleGit(tempDir);
    const htmlFilePath = path.join(tempDir, 'public', 'index.html');

    if (fs.existsSync(htmlFilePath)) {
      let htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');


      htmlContent = htmlContent
        .replace(/<title>.*<\/title>/, `<title>${seoData.title}</title>`)
        .replace(
          /<meta name="description" content=".*?" \/>/,
          `<meta name="description" content="${seoData.description}" />`
        )
        .replace(
          /<meta name="keywords" content=".*?" \/>/,
          `<meta name="keywords" content="${seoData.keywords}" />`
        );

      fs.writeFileSync(htmlFilePath, htmlContent, 'utf-8');
      console.log('SEO tags updated in:', htmlFilePath);
    } else {
      return res.status(404).json({ error: 'index.html not found in public directory.' });
    }


    await clonedGit.add('.');
    await clonedGit.commit(' Updated SEO tags in public/index.html');
    await clonedGit.push('origin', 'main');

    res.json({ success: true, message: 'SEO tags updated and pushed to GitHub!' });
  } catch (err) {
    console.error(' Error:', err.message || err);
    res.status(500).json({ error: err.message || err });
  }
});

app.listen(PORT, () => {
  console.log(`SEO Fixer API running at http://localhost:${PORT}`);
});
