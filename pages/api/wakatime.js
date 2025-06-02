// pages/api/wakatime.js
export default async function handler(req, res) {
  console.log('🚀 WakaTime API called!');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Cek API key
    const apiKey = process.env.WAKATIME_API_KEY;
    
    if (!apiKey) {
      console.log('❌ No API key found');
      return res.status(500).json({ error: 'WakaTime API key not configured' });
    }

    console.log('✅ API key found, fetching data...');
    
    // WakaTime menggunakan Basic Auth, bukan Bearer
    const authString = Buffer.from(`${apiKey}:`).toString('base64');
    console.log('Auth string created');
    
    // Test dengan endpoint user dulu untuk validasi API key
    console.log('Testing user endpoint first...');
    const userResponse = await fetch(
      'https://wakatime.com/api/v1/users/current',
      {
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('User endpoint status:', userResponse.status);
    
    if (!userResponse.ok) {
      const userError = await userResponse.text();
      console.error('❌ User endpoint failed:', userError);
      return res.status(userResponse.status).json({ 
        error: `API Key validation failed: ${userResponse.status}`,
        details: userError
      });
    }
    
    console.log('✅ User endpoint works, fetching summaries...');
    

    const response = await fetch(
      'https://wakatime.com/api/v1/users/current/summaries?range=last_7_days',
      {
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Request sent to WakaTime API');
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      console.error('❌ WakaTime API error:', response.status, response.statusText);
      
      // Coba baca error message dari response
      const errorText = await response.text();
      console.error('Error response body:', errorText);
      
      return res.status(response.status).json({ 
        error: `WakaTime API error: ${response.status}`,
        details: errorText
      });
    }

    const data = await response.json();
    console.log('✅ Data received from WakaTime');
    
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('❌ Error fetching WakaTime data:', error);
    return res.status(500).json({ error: 'Failed to fetch WakaTime data' });
  }
}