const express = require('express');
const router = express.Router();
const Client = require('../models/Client');



router.post('/log-out', (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({message: 'Log out successful'});
});

router.post('/confirmar-cita', (req, res) => {
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