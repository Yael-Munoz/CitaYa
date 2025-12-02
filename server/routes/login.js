// routes/login.js

const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Pro = require('../models/Pro');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// POST /login
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }
  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    // Look up user in either Client or Pro collection
    const existingUser =
      (await Client.findOne({ username })) ||
      (await Pro.findOne({ username }));

    if (!existingUser) {
      console.log('User credentials login attempt failed:', { username });
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Revisa la contraseña!' });
    }

    // Build JWT payload
    const userPayload = {
      _id: existingUser._id,
      role: existingUser.role,
      username: existingUser.username,
    };

    // Sign tokens
    const accessToken = jwt.sign(userPayload, process.env.JWT_TOKEN, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign(userPayload, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: '1h',
    });

    // Set cookies — critical for mobile
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,          
      sameSite: 'None',      
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 60 * 60 * 1000,
    });

    console.log('User logged in successfully');
    return res.status(200).json({ message: 'User found & JWT assigned' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;