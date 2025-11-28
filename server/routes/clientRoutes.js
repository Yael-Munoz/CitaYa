const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Pro = require('../models/Pro');
const Event = require('../models/Event');
const jwt = require('jsonwebtoken');

// --- Log out ---
router.post('/log-out', (req, res) => {
  console.log('llego al back');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Log out successful' });
});

// --- Confirmar cita ---
router.post('/confirmar-cita', async (req, res) => {
  const token = req.cookies.accessToken;
  const data = req.body;

  if (!token) {
    return res.status(401).json({ message: 'Missing JWT' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const clientId = decoded._id;
    const clientUsername = decoded.username;
    const proUsername = data.proUsername;
    const clientPhone = data.clientPhone;
    const startDate = new Date(data.startDate);
    const eventDescription = data.eventDescription;

    const existingPro = await Pro.findOne({ username: proUsername });
    if (!existingPro) {
      return res.status(404).json({ message: 'No se encontro ningun profesional!' });
    }
    if (!clientId) {
      return res.status(400).json({ message: 'Id was not received' });
    }
    if (!clientUsername) {
      return res.status(400).json({ message: 'Client username was not received' });
    }
    if (clientPhone.length < 10 || clientPhone.length > 12) {
      return res.status(400).json({ message: 'Client phone number is not valid' });
    }
    if (isNaN(startDate.getTime())) {
      return res.status(400).json({ message: 'Selected start date is invalid' });
    }

    const event = await Event.create({
      clientId: clientId,
      proId: existingPro._id,
      start: startDate,
      description: eventDescription
    });

    console.log('Event registered: ', event);

    return res.status(200).json(event); // return the event itself so frontend can display it
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: 'Something went wrong, check console' });
  }
});

// --- Get all events for logged-in client ---
router.get('/events', async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: 'Missing JWT' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const clientId = decoded._id;

    // Find all events for this client, include pro username
    const events = await Event.find({ clientId }).populate('proId', 'username');
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: 'Invalid token' });
  }
});

module.exports = router;