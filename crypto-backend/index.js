const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');  // <-- Import path module to serve static files

const app = express();

const corsOptions = {
    origin: ['http://a75311aa5cce641c2bd0dc31f0b77c63-865131364.eu-north-1.elb.amazonaws.com'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));

// Serve static files from the 'public' directory (for frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Route for fetching cryptocurrency prices from CoinGecko API
app.get('/api/prices', async (req, res) => {
    try {
        const response = await axios.get(
            'https://api.coingecko.com/api/v3/coins/markets',
            {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 100,
                    page: 1,
                    sparkline: false,
                },
            }
        );
        res.json(response.data); // Send the API data back to the frontend
    } catch (error) {
        console.error('Error fetching data from CoinGecko API:', error.message);
        res.status(500).json({ error: 'Error fetching cryptocurrency prices' });
    }
});

// Fallback route to serve the React app (single-page app support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Set the port for the application
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Test_01