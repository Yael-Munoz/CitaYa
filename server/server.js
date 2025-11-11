const express = require('express');
const server = express();
const cors = require('cors');
const connectDB = require('./config/db');
const registerRoute = require('./routes/register');
const clientRoute = require('./routes/clientRoutes');
const proRoute = require('./routes/proRoutes');
const authRoute = require('./routes/auth');
const cookieParser = require('cookie-parser');


require('dotenv').config();

connectDB();

server.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

server.use(express.json());
server.use(cookieParser());

server.use('/register', registerRoute);
server.use('/auth', authRoute);
server.use('/client', clientRoute);
server.use('/pro', proRoute);

server.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000/');
});