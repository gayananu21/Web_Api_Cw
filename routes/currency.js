require('dotenv').config(); // init env vars
const got = require('got');
const express = require('express');

const router = express.Router();

// getting API key from env variable

// GET localhost:9000/endpoint
router.get('/endpoint', async (req, res) => {
  // requesting data from 3rd party service
  const response = await got('https://v6.exchangerate-api.com/v6/b1545c28a1aa27fbdd3d66ad/latest/LKR', {

  });

  res.send(response);
});

module.exports = router;
