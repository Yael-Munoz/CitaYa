const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Pro = require('../models/Pro');

router.post('/', (req, res) => {
    const data = req.body;
    console.log('Client data received: ', data);
    res.status(200).json({message: 'Data was received: ', data});
});





module.exports = router;