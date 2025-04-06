require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Temporary test endpoint
app.get('/paymob-webhook', (req, res) => {
    res.status(405).json({
        error: 'Method Not Allowed',
        message: 'This endpoint only accepts POST requests',
        instructions: 'Use Postman or curl to send a POST request with Paymob webhook data'
    });
});

app.post('/paymob-webhook', (req, res) => {
    try {
        if (!req.body || !req.body.obj || !req.body.hmac) {
            return res.status(400).json({ error: 'Invalid webhook format' });
        }


        console.log('Webhook processed successfully');
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Webhook processing error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check endpoint
app.get('/', (req, res) => {
    res.send(`
        <h1>Paymob Webhook Server</h1>
        <p>Server is running</p>
        <p>Webhook endpoint: POST /paymob-webhook</p>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test URL: http://localhost:${PORT}`);
    console.log(`Webhook URL: http://localhost:${PORT}/paymob-webhook`);
});