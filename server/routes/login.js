const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Pro = require('../models/Pro');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/', async (req, res) => {

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
        const existingUser = (await Client.findOne({ username: username}) || await Pro.findOne({ username: username}));
        if(!existingUser) {
            console.log('User credentials login attempt: ', data);
            return res.status(404).json({ message: 'User not found'});
        }
        else {

            
            const isClientMatch = await bcrypt.compare(password, existingUser.password);
            const isProMatch = await bcrypt.compare(password, existingUser.password);

            if(isClientMatch || isProMatch) {

                const user = {
                    _id: existingUser._id,
                    role: existingUser.role,
                    username: existingUser.username
                }

                const accessToken = jwt.sign(user, process.env.JWT_TOKEN);
                const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_TOKEN);

                res.cookie('accessToken', accessToken, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 15 * 60 * 1000
                });

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 60 * 60 * 1000
                });

                console.log('User logged in!');
                return res.status(200).json({ message: 'User found & JWT assigned'});
            }
            else {
                return res.status(401).json({ message: "Credentials don't match"});
            }
            
        }
    }

    catch(error) {
        return res.status(500).json({ message: 'error'});
    }

});

module.exports = router;