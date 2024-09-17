// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

const IPINFO_TOKEN = '899f12fa5133df';
const IPINFO_URL = `https://ipinfo.io/json?token=${IPINFO_TOKEN}`;

app.use(express.static('public'));

app.get('/api/ipinfo', async (req, res) => {
    try {
        const response = await fetch(IPINFO_URL);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch IP info' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
