const mongoose = require('mongoose');

const ProSchema = new mongoose.Schema({
    role: {type: String, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

const Pro = mongoose.model('Professional', ProSchema);

module.exports = Pro;