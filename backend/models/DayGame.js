const mongoose = require('mongoose');
const Schema = mongoose.Schema;



let DayGame = new Schema({
    _id:{ 
        type:Schema.Types.ObjectId,
        auto: true
    },    date: {
        type:Date,
        required: true,
        unique: true
    },
    anagram:{
        type:Schema.Types.ObjectId,
        ref: 'Anagram',
        required: true
    },
    goblet:{
        type:Schema.Types.ObjectId,
        ref: 'Goblet',
        required:true
    }

},{
    collection:'games'
});

module.exports = mongoose.model('DayGame', DayGame);