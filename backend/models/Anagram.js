const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Anagram = new Schema({
    _id:{ 
        type:Schema.Types.ObjectId,
        auto: true
    },
    puzzle: {
        type:String,
        required: true,
        unique: true
    },
    solution: {
        type: String,
        required: true,
        unique: true
    }

},{
    collection:'anagrams'
});

module.exports = mongoose.model('Anagram', Anagram);