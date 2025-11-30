const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {type: String},
    clientId: {type: mongoose.Schema.Types.ObjectId, ref: 'Client',required: true},
    proId: {type: mongoose.Schema.Types.ObjectId, ref: 'Professional',required: true},
    start: {type: Date, required: true},
    end: {type: Date, 
        default: function() {
            return new Date(this.start.getTime() + 30 * 60000);
        }
    },
    clientPhone: {type: String},
    proPhone: {type: String},
    description: {type: String, default: 'No se agrego una descripcion'}
});


const Event = mongoose.model('Event', EventSchema);

module.exports = Event;