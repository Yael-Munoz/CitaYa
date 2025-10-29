const express = require('express');
const server = express();
const cors = require('cors');

server.use(cors({
    origin: 'http://localhost:5173'
}));



server.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000/');
})

server.get('/', (req, res) => {
    res.status(200).json({message: 'Everything is working properly'});
});