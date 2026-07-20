export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO&strategy=mobile`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(response.ok ? 200 : 502).json(data);
  } catch (err) {
    return res.status(502).json({ error: 'Failed to fetch from PageSpeed API' });
  }
}
