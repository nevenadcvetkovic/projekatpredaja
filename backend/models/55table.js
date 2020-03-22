const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Table55 = new Schema({
    _id:{ 
        type:Schema.Types.ObjectId,
        auto: true
    },    hc1: {
        type:String,
        required: true,
        minlength: [5, 'The word has to be 5 characters long']
    },
    hc2: {
        type: String,
        required: true,
        minlength: [5, 'The word has to be 5 characters long']
    },
    hc3: {
        type:String,
        required: true,
        minlength: [5, 'The word has to be 5 characters long']
    },
    hc4: {
        type: String,
        required: true,
        minlength: [5, 'The word has to be 5 characters long']
    }, 
    hc5:{
        type: String,
        required: true,
        minlength: [5, 'The word has to be 5 characters long']
    }

},{
    collection:'table55'
});

module.exports = mongoose.model('Table55', Table55);