
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connectDB = require('./config/db');

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const dashboardRoute = require('./routes/dashboard');
const clientRoute = require('./routes/clientRoutes');
const proRoute = require('./routes/proRoutes');
const authRoute = require('./auth/refresh');

const server = express();

connectDB();

server.use(cors({
  origin: [process.env.CLIENT_URL || 'https://citayamx.com', 'http://localhost:5173'], 
  credentials: true, 
}));

server.use(express.json());
server.use(cookieParser());

server.use('/auth', authRoute);
server.use('/register', registerRoute);
server.use('/login', loginRoute);
server.use('/dashboard', dashboardRoute);
server.use('/client', clientRoute);
server.use('/pro', proRoute);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});