const express = require('express');
const router = express.Router();
const Pro = require('../models/Pro');
const Client = require('../models/Client');
const jwt = require('jsonwebtoken');
const Event = require('../models/Event');

router.post('/log-out', (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Log out successful' });
});

router.post('/add-event', async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({ message: 'Missing JWT' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const proId = decoded._id;

        const { clientUsername, start, end, description, title } = req.body;

        if (!start) {
            return res.status(400).json({ message: 'Start date required' });
        }
        if (!clientUsername) {
            return res.status(400).json({ message: 'Client username required' });
        }

        // Find client by username
        const client = await Client.findOne({ username: clientUsername });
        if (!client) {
            return res.status(404).json({ message: 'No se encontro el cliente' });
        }

        const event = await Event.create({
            title,
            clientId: client._id,
            proId,
            start: new Date(start),
            end: end ? new Date(end) : undefined,
            description: description || 'No se agregó descripción',
            clientPhone: client.phone, // Save client phone
            proPhone: decoded.phone || '' // Optionally save pro phone if you store it in JWT
        });

        console.log(event);

        res.status(201).json(event);
    } catch (err) {
        console.error(err);
        res.status(403).json({ message: 'Error creating event' });
    }
});

router.get('/events', async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: 'Missing JWT' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const proId = decoded._id;

        // Include phone when populating clientId
        const events = await Event.find({ proId }).populate('clientId', 'username phone');
        res.status(200).json(events);
    } catch (err) {
        console.error(err);
        res.status(403).json({ message: 'Invalid token' });
    }
});

module.exports = router;
