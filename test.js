const axios = require('axios');

async function testUrlShortener() {
  try {
    console.log('1. Creating short URL...');
    const response = await axios.post('http://localhost:3000/api/shorten', {
      longUrl: 'https://www.youtube.com'
    });
    
    console.log('Response:', response.data);
    
    const shortUrl = response.data.shortUrl;
    const urlCode = response.data.urlCode;
    
    console.log('\n2. Testing short URL redirection...');
    try {
      const redirectResponse = await axios.get(shortUrl, {
        maxRedirects: 0,
        validateStatus: status => status >= 200 && status < 400
      });
      console.log('Redirection successful!');
    } catch (error) {
      if (error.response && error.response.status === 302) {
        console.log('Redirection successful!');
        console.log('Redirects to:', error.response.headers.location);
      } else {
        console.error('Redirection failed:', error.message);
      }
    }
    
    console.log('\n3. Checking URL stats...');
    const statsResponse = await axios.get(`http://localhost:3000/api/${urlCode}/stats`);
    console.log('Stats:', statsResponse.data);
    
  } catch (error) {
    console.error('Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    }
  }
}

testUrlShortener();
