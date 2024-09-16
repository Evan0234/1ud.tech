const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));  // Serve static files from 'public' folder

// Endpoint to handle the API request
app.get('/api/check-vpn', async (req, res) => {
  try {
    const apiKey = process.env.PROXYCHECK_API_KEY;  // Store your API key in an environment variable
    const response = await axios.get(`https://proxycheck.io/v2/?key=${apiKey}&vpn=1`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
