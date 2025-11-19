const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Pro = require('../models/Pro');
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










module.exports = router;