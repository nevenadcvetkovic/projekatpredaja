const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GeographySupervize = new Schema({
    _id:{ 
        type:Schema.Types.ObjectId,
        auto: true
    },    
    letter: {
        type:String,
        required: true,
        maxlength:[2]
    },
    category: {
        type: String,
        required: true
    },
    word: {
        type:String,
        required:true
    }

},{
    collection:'geographysupervize'
});

module.exports = mongoose.model('GeographySupervize', GeographySupervize);