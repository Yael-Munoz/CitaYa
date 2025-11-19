const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    clientId: {type: String, required: true},
    proId: {type: String, required: true},
    date: {type: Date, required: true},
    time: {type: String, required: true},
    description: {type: String}
});


const Event = mongoose.model('Event', EventSchema);

module.exports = Event;