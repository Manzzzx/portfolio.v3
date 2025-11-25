/**
 * WakaTime API Route
 * 
 * Fetches coding statistics from WakaTime API.
 * Endpoint: /api/wakatime
 * 
 * Environment Variables Required:
 * - WAKATIME_API_KEY: Your WakaTime API key from https://wakatime.com/settings/account
 * 
 * @module pages/api/wakatime
 */

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get API key from environment variables
    const apiKey = process.env.WAKATIME_API_KEY;
    
    // Check if API key is configured
    if (!apiKey) {
      console.error('❌ WAKATIME_API_KEY not found in environment variables');
      return res.status(500).json({ 
        error: 'WakaTime API key not configured',
        hint: 'Add WAKATIME_API_KEY to your .env file. Get it from https://wakatime.com/settings/account'
      });
    }

    // Validate API key format
    if (!apiKey.startsWith('waka_')) {
      console.error('❌ Invalid WAKATIME_API_KEY format');
      return res.status(500).json({ 
        error: 'Invalid WakaTime API key format',
        hint: 'API key should start with "waka_". Check https://wakatime.com/settings/account'
      });
    }

    console.log('✅ WakaTime API key found, fetching data...');

    // Encode API key for Basic Auth
    const authString = Buffer.from(`${apiKey}:`).toString('base64');
    
    // WakaTime API endpoint for last 7 days summary
    const summariesUrl = 'https://wakatime.com/api/v1/users/current/summaries?range=last_7_days';
    
    console.log(`📡 Fetching from: ${summariesUrl}`);

    // Fetch data from WakaTime
    const response = await fetch(summariesUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
        'User-Agent': 'NextJS-Portfolio/1.0',
      },
    });

    console.log(`📊 WakaTime API Response Status: ${response.status}`);

    // Handle API errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ WakaTime API Error:', errorText);
      
      // Provide helpful error messages
      let errorMessage = `WakaTime API error: ${response.status}`;
      let hint = '';

      if (response.status === 401) {
        errorMessage = 'Invalid WakaTime API key';
        hint = 'Check your API key at https://wakatime.com/settings/account';
      } else if (response.status === 403) {
        errorMessage = 'Access forbidden';
        hint = 'Make sure your API key has the correct permissions';
      } else if (response.status === 429) {
        errorMessage = 'Rate limit exceeded';
        hint = 'Too many requests. Please try again later';
      }

      return res.status(response.status).json({ 
        error: errorMessage,
        hint: hint,
        details: errorText
      });
    }

    // Parse and return data
    const data = await response.json();
    console.log('✅ Successfully fetched WakaTime data');
    console.log(`📈 Total days: ${data.data?.length || 0}`);
    
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('❌ Error fetching WakaTime data:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch WakaTime data',
      details: error.message,
      hint: 'Check server logs for more details'
    });
  }
}