const express = require('express');
const router = express.Router();
const Client = require('../models/Client');



router.post('/', (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({message: 'Log out successful'});
});


module.exports = router;