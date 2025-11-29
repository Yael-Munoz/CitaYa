const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Pro = require('../models/Pro');
const Event = require('../models/Event');
const jwt = require('jsonwebtoken');

// --- Log out ---
router.post('/log-out', (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Log out successful' });
});

// --- Confirmar cita ---
router.post('/confirmar-cita', async (req, res) => {
  const token = req.cookies.accessToken;
  const data = req.body;

  if (!token) return res.status(401).json({ message: 'Missing JWT' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const clientId = decoded._id;
    const clientUsername = decoded.username;
    const { proUsername, clientPhone, startDate, eventDescription } = data;

    if (!proUsername) return res.status(400).json({ message: 'Pro username required' });
    if (!clientPhone || clientPhone.length < 10 || clientPhone.length > 12) {
      return res.status(400).json({ message: 'Client phone number is invalid' });
    }
    const start = new Date(startDate);
    if (isNaN(start.getTime())) return res.status(400).json({ message: 'Invalid start date' });

    const existingPro = await Pro.findOne({ username: proUsername });
    if (!existingPro) return res.status(404).json({ message: 'Professional not found' });

    const event = await Event.create({
      clientId,
      proId: existingPro._id,
      start,
      description: eventDescription || 'No se agregó descripción',
      clientPhone,
      proPhone: existingPro.phone || ''
    });

    res.status(200).json({
      ...event.toObject(),
      proUsername: existingPro.username,
      proPhone: existingPro.phone || ''
    });
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: 'Something went wrong, check console' });
  }
});

// --- Get all events for logged-in client ---
router.get('/events', async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: 'Missing JWT' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const clientId = decoded._id;

    const events = await Event.find({ clientId }).populate('proId', 'username phone');

    const formattedEvents = events.map(ev => ({
      ...ev.toObject(),
      proUsername: ev.proId?.username || 'Profesional',
      proPhone: ev.proId?.phone || ''
    }));

    res.status(200).json(formattedEvents);
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: 'Invalid token' });
  }
});

module.exports = router;
