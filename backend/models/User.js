const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var jwt = require('jsonwebtoken');



// Define collection and schema
let User = new Schema({
    _id:{ 
        type:Schema.Types.ObjectId,
        auto: true
    },    name: {
        type: String,
        required: 'Name can\'t be empty'
    },
    surname: {
        type: String,
        required: 'Surname can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty'
    },
    vocation: {
        type: String,
        required: 'You have to enter your vocation'

    },
    userType: {
        type: Number,
        required: 'You have to define user type'

    },
    username: {
        type: String,
        required: 'Username can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [8, 'Password has to be at least 8 character long'],
        maxlength: [12, 'Password can hav maximum 12 characters']
    },
    passwordRepeat: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [8, 'Password has to be at least 8 character long'],
        maxlength: [12, 'Password can hav maximum 12 characters']
    },
    gender: {
        type: Number,
        required: 'Gender can\'t be empty'
    },
    JMBG: {
        type: String,
        required: 'JMBG can\'t be empty'
    },
    secretQuestion: {
        type: String,
        required: 'Question can\'t be empty'
    },
    secretAnswer: {
        type: String,
        required: 'You have to write an answer'

    },
    isApproved:{
        type: Boolean,
        required: 'You have to define is account approved'
    },
    hash: String,
    salt: String
}, {
        collection: 'users'
    });

//events
//do this for secretAnswer
/*User.pre('save', (next) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            console.log(this.password);
        });
        bcrypt.hash(this.secretAnswer, salt, (err, hash) => {
            this.secretAnswer = hash;
            this.saltSecret = salt;
            next();
        });
    });
})*/

User.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      name: this.name,
      surname: this.surname,
      username: this.username,
      userType: this.userType,
      JMBG: this.JMBG,
      secretQuestion: this.secretQuestion,
      secretAnswer: this.secretAnswer,
      exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };

User.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

User.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
}
module.exports = mongoose.model('User', User);