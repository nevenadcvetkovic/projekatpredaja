var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function(req, res) {
    var user = new User();
  
    user.name = req.body.name;
    user.surname=req.body.surname
    user.email = req.body.email;
    user.vocation=req.body.vocation;
    user.userType=req.body.userType;
    user.username=req.body.username;
    user.gender=req.body.gender;
    user.JMBG=req.body.JMBG;
    user.secretQuestion=req.body.secretQuestion;
    user.secretAnswer=req.body.secretAnswer;
    user.isApproved=req.body.isApproved;
  
    user.setPassword(req.body.password);
  
    user.save(function(err) {
      var token;
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    });
  };

  module.exports.login = function(req, res) {

    passport.authenticate('local', function(err, user, info){
      var token;
  
      // If Passport throws/catches an error
      if (err) {
        res.status(404).json(err);
        return;
      }
  
      // If a user is found
      if(user){
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      } else {
        // If user is not found
        res.status(401).json(info);
      }
    })(req, res);
  
  };