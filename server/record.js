const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    userId: {
        type: String,
        required: false,
        ref: 'User'
    },
    date: {
        type: Date,
        required: false
    },
    time: {
        type: String,
        required: false
    },
    service: {
        type: String,
        required: false
    },
    portfolioId: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Portfolio'
    }
});

module.exports = mongoose.model('Booking', BookingSchema);
