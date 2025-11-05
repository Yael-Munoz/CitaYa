const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Pro = require('../models/Pro');

router.post('/', (req, res) => {
    const data = req.body;

    const errors = [];

    if(!data.role) {errors.push('Role is required');}

    if(!data.username 
       || data.username.length < 4
       || data.username.length > 16) 
       {errors.push('Username is required and must be between 4 and 16 characters');}

    if(!data.password
       || !data.confirmPassword 
       || data.password 
       !== data.confirmPassword) {errors.push('Password is required and must match the confirmation password');}

    let isProValid = true;

    if(!data.name) {errors.push('Name is required'); isProValid = false;}
    if(!data.number) {errors.push('Phone number is required'); isProValid = false;}
    if(!data.email) {errors.push('Email is required'); isProValid = false;}

    const role = data.role;
    const username = data.username;
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    if(isProValid) {
        const name = data.name;
        const number = data.number;
        const email = data.email;
    }

    if(errors.length > 0) {
        console.log('Error(s) were captured: ' + errors);
        return res.status(400).json({message: errors});
    }


    

    



});







module.exports = router;