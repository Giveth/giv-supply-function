const { calculateTokenSupplyCG } = require('./src/coingecko'); // Import the function from coingecko.js
const { calculateTokenSupplyCMC } = require('./src/coinmarketcap'); // Import the function from coinmarketcap.js
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

// Route to serve the JSON response with a 200 status code for CoinMarketCap
app.get('/giv-supply-cmc', async (req, res) => {
    try {
        const queryParam = req.query.q;
        if (!queryParam) {
            return res.status(400).json({ error: "Invalid input. Missing query parameter." });
        }
        const result = await calculateTokenSupplyCMC(queryParam);
        if (result === "invalid input") {
            return res.status(400).json({ error: "Invalid input. Unsupported query parameter." });
        }
        // Send the result as a stringified JSON
        res.status(200).json(result.toString().trim());
    } catch (error) {
        res.status(500).json({ error: 'Error loading data' });
    }
});

// Route to serve the JSON response with a 200 status code for CoinGecko
app.get('/giv-supply-cg', async (req, res) => {
    try {
        const result = await calculateTokenSupplyCG();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error loading data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});