const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const MAIN_SERVICE_URL = process.env.MAIN_SERVICE_URL;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

const pingMainService = async () => {
  try {
    const response = await axios.get(MAIN_SERVICE_URL);
    console.log(`Pinged main service at ${new Date().toISOString()} - Response: ${response.status}`);
  } catch (error) {
    console.error(`Error pinging main service: ${error.message}`);
  }
};

app.listen(PORT, () => {
  console.log(`Ping service running on port ${PORT}`);
  
  setInterval(pingMainService, 10 * 60 * 1000);
});