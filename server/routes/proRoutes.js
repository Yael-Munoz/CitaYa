const express = require('express');
const router = express.Router();
const Pro = require('../models/Pro');




router.post('/', (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({message: 'Log out successful'});
});


module.exports = router;