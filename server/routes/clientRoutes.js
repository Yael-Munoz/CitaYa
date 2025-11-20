const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Pro = require('../models/Pro');
const Event = require('../models/Event');
const jwt = require('jsonwebtoken');



router.post('/log-out', (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({message: 'Log out successful'});
});

router.post('/confirmar-cita', async (req, res) => {

    const token = req.cookies.accessToken;
    const data = req.body;

    if(!token) {
        res.status(401).json({message: 'Missing JWT'});
    }
    else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_TOKEN);
            const _id = decoded._id;
            const clientUsername = decoded.username;
            const proUsername = data.proUsername;
            const clientPhone = data.clientPhone;
            const selectedDate = new Date(data.selectedDate);
            const eventDescription = data.eventDescription;

            const existingUser = await Pro.findOne({username: proUsername});
            if(!existingUser) {
                return res.status(404).json({message: 'Professional was not found'});
            }
            if(!_id) {
                return res.status(404).json({message: 'Id was not received'});
            }
            if(!clientUsername) {
                return res.status(404).json({message : 'Client username was not received'});
            }
            if(clientPhone.length < 10 || clientPhone.length > 12) {
                return res.status(404).json({message: 'Client phone number is not valid'});
            }
            if(isNaN(selectedDate.getTime())) {
                return res.status(400).json({message: 'Selected date is invalid'});
            }


        }
        catch(error) {
            res.status(403).json({message: 'JWT is wrong'});
        }
    }

    


//en el clientDashboard ya se envio: 
// const userForm = {
//       proUsername: proUsernameRef.current.value,
//       clientPhone: clientPhoneRef.current.value,
//       selectedDate: selectedDate,
//       eventDescription: eventDescriptionRef.current.value
//     }
//falta recibirlo en el backend y crear un evento con el modelo de eventos


});




module.exports = router;