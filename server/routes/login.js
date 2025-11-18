const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Pro = require('../models/Pro');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/login', async (req, res) => {

    const data = req.body;

    if(!data.username) {
        return res.status(400).json({ message: 'Username is required'});
    }
    if(!data.password) {
        return res.status(400).json({ message: 'Password is required'});
    }

    const username = data.username;
    const password = data.password;

    try {
        const existingClient = await Client.findOne({ username: username});
        const existingPro = await Pro.findOne({ username: username});
        const hashedPassword = data.password;

        if(existingClient) {
            
        }
        if(existingPro) {

        }
    }

    catch(error) {

    }

});