export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.WAKATIME_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'WakaTime API key not configured' });
    }

    const authString = Buffer.from(`${apiKey}:`).toString('base64');
    const summariesUrl = 'https://wakatime.com/api/v1/users/current/summaries?range=last_7_days';
    
    const response = await fetch(summariesUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
        'User-Agent': 'NextJS-App/1.0',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ 
        error: `WakaTime API error: ${response.status}`,
        details: errorText
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    return res.status(500).json({ 
      error: 'Failed to fetch WakaTime data',
      details: error.message
    });
  }
}