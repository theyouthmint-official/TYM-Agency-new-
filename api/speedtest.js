const https = require('https');

module.exports = async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO&strategy=mobile`;

  return new Promise((resolve) => {
    https.get(apiUrl, (response) => {
      let body = '';
      response.on('data', chunk => { body += chunk; });
      response.on('end', () => {
        try {
          const data = JSON.parse(body);
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.status(response.statusCode === 200 ? 200 : 502).json(data);
        } catch (e) {
          res.status(502).json({ error: 'Invalid response from PageSpeed API' });
        }
        resolve();
      });
    }).on('error', () => {
      res.status(502).json({ error: 'Failed to fetch from PageSpeed API' });
      resolve();
    });
  });
};
