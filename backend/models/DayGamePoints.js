const mongoose = require('mongoose');
const Schema = mongoose.Schema;



let DayGamePoints = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    }, date: {
        type: Date,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    }

}, {
        collection: 'gamesPoints'
    });

module.exports = mongoose.model('DayGamePoints', DayGamePoints);