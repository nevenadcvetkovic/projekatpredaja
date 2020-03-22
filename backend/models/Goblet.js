const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Goblet = new Schema({
    _id:{ 
        type:Schema.Types.ObjectId,
        auto: true
    },
    tQuestion7: {
        type:String,
        required: true
    },
    tAnswer7: {
        type: String,
        required: true
    },
    tQuestion6: {
        type:String,
        required: true
    },
    tAnswer6: {
        type: String,
        required: true
    },
    tQuestion5: {
        type:String,
        required: true
    },
    tAnswer5: {
        type: String,
        required: true
    },
    tQuestion4: {
        type:String,
        required: true
    },
    tAnswer4: {
        type: String,
        required: true
    },
    tQuestion3: {
        type:String,
        required: true
    },
    tAnswer3: {
        type: String,
        required: true
    },
    tQuestion2: {
        type:String,
        required: true
    },
    tAnswer2: {
        type: String,
        required: true
    },
    tQuestion1: {
        type:String,
        required: true
    },
    tAnswer1: {
        type: String,
        required: true
    },
    bQuestion2: {
        type:String,
        required: true
    },
    bAnswer2: {
        type: String,
        required: true
    },
    bQuestion3: {
        type:String,
        required: true
    },
    bAnswer3: {
        type: String,
        required: true
    },
    bQuestion4: {
        type:String,
        required: true
    },
    bAnswer4: {
        type: String,
        required: true
    },
    bQuestion5: {
        type:String,
        required: true
    },
    bAnswer5: {
        type: String,
        required: true
    },
    bQuestion6: {
        type:String,
        required: true
    },
    bAnswer6: {
        type: String,
        required: true
    },
    bQuestion7: {
        type:String,
        required: true
    },
    bAnswer7: {
        type: String,
        required: true
    }

},{
    collection:'goblets'
});

module.exports = mongoose.model('Goblet', Goblet);