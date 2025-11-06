const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Pro = require('../models/Pro');

router.post('/', async (req, res) => {
    const data = req.body;

    const messages = [];

    if(!data.role) {messages.push('Role is required'); return res.status(400).json({message: 'An account cannot be created without a role'});}

    const role = data.role;

    if (!data.username 
        || data.username.length < 4
        || data.username.length > 16) 
        {messages.push('Username is required and must be between 4 and 16 characters');}

    if (!data.password
        || !data.confirmPassword 
        || data.password 
        !== data.confirmPassword) 
        {messages.push('Password is required and must match the confirmation password');}

    const username = data.username;
    const password = data.password;

    if (role === 'client'){

        try {

            console.log('Client role reached');

            const existingClient = await Client.findOne({ username: username});
            if (existingClient) {
                console.log('Existing username was found in database');
                return res.status(400).json({message: 'Username already exists'});
            }

            const client = await Client.create({role, username, password});
            console.log('Client registered: ', client);

            return res.status(200).json({message: 'Client registered successfully'});

        } catch (error) {
            console.log(error);
            res.status(500).send({message: 'Internal Server Error'});
        }

        

    

        
    }
    else if (role === 'pro') {

        if (!data.name
            || (typeof data.name === 'string' && 
            (data.name.length < 6
            || data.name.length > 25
        ))

        ) {
        messages.push('Name is nonexistent or invalid');
        }

        if (!data.number 
            || (typeof data.number === 'string' && data.number.length !== 10)
            || (typeof data.number === 'number' && data.number.toString().length !== 10)
        ) {
        messages.push('Number is invalid');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!data.email 
            || !emailRegex.test(data.email)
        ) {
        messages.push('Email is invalid');
        }

        if (messages.length > 0) {
            console.log('Messages were returned: ' + messages);
            return res.status(400).json({message: messages});
        }

        const name = data.name;
        const number = data.number;
        const email = data.number;

        console.log();

    }
    else {
        messages.push('This role is undefined');
        return res.status(400).json({message: messages})
    }

    




    if(messages.length > 0) {
        console.log('Error(s) were captured: ' + messages);
        return res.status(400).json({message: messages});
    }


    

    



});







module.exports = router;