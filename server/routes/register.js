const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Pro = require('../models/Pro');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const data = req.body;
    const messages = [];

    if (!data.role) {
        return res.status(400).json({ message: 'An account cannot be created without a role' });
    }
    const role = data.role;

    if (!data.username || data.username.length < 3 || data.username.length > 16) {
        messages.push('Username is required and must be between 3 and 16 characters');
    }

    if (!data.password || !data.confirmPassword || data.password !== data.confirmPassword) {
        messages.push('Password is required and must match the confirmation password');
    }

    if (role === 'pro') {

        if (!data.name || data.name.length < 3 || data.name.length > 25) {
            messages.push('Name must be between 3 and 25 characters');
        }

        if (!data.phone || typeof data.phone !== 'string' || data.phone.length !== 13) {
            messages.push('Phone number is invalid');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            messages.push('Email is invalid');
        }

        if (messages.length > 0) {
            return res.status(400).json({ message: messages });
        }

        try {
            const existingPro = await Pro.findOne({ username: data.username });
            const existingClient = await Client.findOne({ username: data.username});
            if (existingPro || existingClient) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            const hashedPassword = await bcrypt.hash(data.password, 12);

            const pro = await Pro.create({
                role,
                name: data.name,
                phone: data.phone,
                email: data.email,
                username: data.username,
                password: hashedPassword
            });
            console.log('Professional registered: ', pro);

            return res.status(200).json({ message: 'Pro registered successfully', pro });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    else if (role === 'client') {
       
        if (messages.length > 0) {
            return res.status(400).json({ message: messages });
        }

        try {
            const existingClient = await Client.findOne({ username: data.username });
            const existingPro = await Pro.findOne({ username: data.username});
            if (existingClient || existingPro) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            const hashedPassword = await bcrypt.hash(data.password, 12);

            const client = await Client.create({
                role, 
                username: data.username, 
                password: hashedPassword });
            console.log('Client registered successfully', client);
            return res.status(200).json({ message: 'Client registered successfully', client });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        return res.status(400).json({ message: 'This role is undefined' });
    }
});

module.exports = router;
