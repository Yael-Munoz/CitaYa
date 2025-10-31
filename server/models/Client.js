const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    role: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    telefono: {type: String},
    createdAt: {type: Date, default: Date.now}
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;