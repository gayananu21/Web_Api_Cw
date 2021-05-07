/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../Models/Authentication/user');

const router = express.Router();
require('dotenv').config();

// eslint-disable-next-line prefer-destructuring
const SECRET_KEY = process.env.SECRET_KEY;
// Declaring Secret key from .env file.

// Login process using email and password
router.post('/', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email  or password provided for authentication');

  const pwValid = await bcrypt.compare(req.body.password, user.password);
  if (!pwValid) return res.status(400).send('Invalid email or password provided for authentication');

  // Generating an Secret key for user.
  const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, SECRET_KEY);
  const uId = user._id;
  return res.status(200).send({ uId, token });
});

// Checking Admin or User using JWT token.
router.post('/check', async (req, res) => {
  const token = req.header('token');
  if (!token) return res.status(401).send('Access denied. No token');

  try {
    jwt.verify(token, SECRET_KEY);
  } catch {
    return res.status(400).send('Invalid token');
  }

  const decoded = jwt.decode(token, SECRET_KEY);

  try {
    if (decoded.isAdmin != null) {
      if (!decoded.isAdmin) {
        return res.send('User');
      }

      return res.send('Admin');
    }
  } catch {
    res.send('No token. Please log in again.');
  }
});

router.post('/get/adminToken', async (req, res) => {
  const bodyToken = req.header('token');
  if (!bodyToken) return res.status(401).send('Access denied. No token');

  try {
    jwt.verify(bodyToken, SECRET_KEY);
  } catch {
    res.status(400).send('Invalid token');
  }

  const token = jwt.sign({ id: user._id, email: user.email, isAdmin: 'confirmed' }, SECRET_KEY);
  res.status(200).send({ token });
});

// Getting UserId using JWT token
router.post('/get/userId', async (req, res) => {
  const token = req.header('token');
  if (!token) return res.status(401).send('Access denied. No token');

  try {
    jwt.verify(token, SECRET_KEY);
  } catch {
    res.status(400).send('Invalid token');
  }

  const decoded = jwt.decode(token, SECRET_KEY);
  res.send(decoded.id);
});

module.exports = router;
