// pages/api/wakatime.js
export default async function handler(req, res) {
  console.log('🚀 WakaTime API called!');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.WAKATIME_API_KEY;
    
    if (!apiKey) {
      console.log('❌ No API key found');
      return res.status(500).json({ error: 'WakaTime API key not configured' });
    }

    console.log('✅ API key found');
    
    // WakaTime menggunakan Basic Auth
    const authString = Buffer.from(`${apiKey}:`).toString('base64');
    
    // Ambil summaries langsung
    console.log('📊 Fetching summaries...');
    const summariesUrl = 'https://wakatime.com/api/v1/users/current/summaries?range=last_7_days';
    
    const response = await fetch(summariesUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
        'User-Agent': 'NextJS-App/1.0',
      },
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ WakaTime API error:', response.status, errorText);
      
      return res.status(response.status).json({ 
        error: `WakaTime API error: ${response.status}`,
        details: errorText
      });
    }

    const data = await response.json();
    console.log('✅ Data received from WakaTime:');
    console.log('- Data keys:', Object.keys(data));
    console.log('- Data.data length:', data.data?.length || 0);
    console.log('- Full structure:', JSON.stringify(data, null, 2));
    
    if (data.data && data.data.length > 0) {
      console.log('- Sample day:', JSON.stringify(data.data[0], null, 2));
    } else {
      console.log('- No data.data or empty array');
    }
    
    // PERBAIKAN UTAMA: Return data dalam format yang diharapkan frontend
    return res.status(200).json(data); // Return data langsung, bukan dalam wrapper
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch WakaTime data',
      details: error.message
    });
  }
}