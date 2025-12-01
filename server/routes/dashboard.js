const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Pro = require('../models/Pro');
const Event = require('../models/Event');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/', (req, res) => {

    const token = req.cookies.accessToken;
    if(!token) {
        return res.status(401).json({ message: 'No token provided'});
    }
    else {
        try {
            
            const decoded = jwt.verify(token, process.env.JWT_TOKEN);
            req.user = decoded;
            const _id = decoded._id;
            const role = decoded.role;
            const username = decoded.username
            
            return res.status(200).json({
                _id,
                role,
                username
             });
            
        }
        catch(error) {
                return res.status(403).json({ message: 'Invalid token'});
        }
        
    }
    
});

router.delete('/delete-event', async (req, res) => {
  const token = req.cookies.accessToken;
  const { id } = req.body;

  if (!token) return res.status(401).json({ message: 'No token provided' });
  if (!id) return res.status(400).json({ message: 'No event id received' });

  try {
    
    jwt.verify(token, process.env.JWT_TOKEN);

    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    return res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
});


module.exports = router;