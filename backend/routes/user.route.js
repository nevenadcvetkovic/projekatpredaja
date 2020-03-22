const express = require('express');
const app = express();
const userRoute = express.Router();
/*var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});
var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');*/
//User model
let User = require('../models/User');

let Anagram = require('../models/Anagram');
let table55 = require('../models/55table');
let Geography = require('../models/Geography');
let GeographySupervize = require('../models/GeographySupervize');
let Goblet = require('../models/Goblet');
let DayGame = require('../models/DayGame');
let DayGamePoints=require('../models/DayGamePoints')



//userRoute.get('/profile', auth, ctrlProfile.profileRead);
//insert word into interesting geography table
userRoute.route('/insertGeographyS').post((req, res, next) => {
  GeographySupervize.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    }
    else {
      res.json(data);
    }
  })
});

// Get table to supervize
userRoute.route('/getGeoRowsS').get((req, res) => {
  GeographySupervize.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});
userRoute.route('/getGeoRowS').post((req, res, next) => {
  GeographySupervize.findOne(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

//remove supervized row
userRoute.route('/deleteGeoSup/:id').delete((req, res, next) => {
  GeographySupervize.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

userRoute.route('/insertGeography').post((req, res, next) => {
  Geography.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    }
    else {
      res.json(data);
    }
  })
});

// Get single row
userRoute.route('/getGeoRow').post((req, res, next) => {
  Geography.findOne(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});




userRoute.route('/insertTable55').post((req, res, next) => {
  table55.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data);
    }
  })
})

userRoute.route('/getRTable55').get((req, res) => {
  table55.aggregate([{ $sample: { size: 1 } }], (error, data) => {
    if (error){
      return next(error);
    }
    else{
      return res.json(data);
    }
  })
})

userRoute.route('/insertAnagram').post((req, res, next) => {
  Anagram.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data);
    }
  })
})
// Get All Anagrams
userRoute.route('/getAnagrams').get((req, res) => {
  Anagram.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single anaagram
userRoute.route('/getAnagram/:id').get((req, res) => {
  Anagram.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
//insert into goblet
userRoute.route('/insertGoblet').post((req, res, next) => {
  Goblet.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data);
    }
  })
})
// Get All Goblets
userRoute.route('/getGoblets').get((req, res) => {
  Goblet.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single goblet
userRoute.route('/getGoblet/:id').get((req, res) => {
  Goblet.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//insert new played day game
userRoute.route('/insertDayGamePoints').post((req, res, next) => {
  DayGamePoints.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data);
    }
  })
})
//get played daygame by date and userId
userRoute.route('/getDayGamePoints').post((req, res, next) => {
  DayGamePoints.findOne(req.body, (error, data) => {
    if (error)
      return next(error)
    else res.json(data);
  })
})

//get last 20 games
userRoute.route('/getLast/:limit').post((req, res, next)=>{
  var mysort = { points: -1 };
  DayGamePoints.find(req.body).sort(mysort).limit(parseInt(req.params.limit)).exec((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }

  })

})

//insert new day game
userRoute.route('/insertDayGame').post((req, res, next) => {
  DayGame.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data);
    }
  })
})
// Get All daygames
userRoute.route('/getDayGames').get((req, res) => {
  DayGame.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }

  })
})

//get daygame by date
userRoute.route('/getDayGame').post((req, res, next) => {
  DayGame.findOne(req.body, (error, data) => {
    if (error)
      return next(error)
    else res.json(data);
  })
})
// Add User
userRoute.route('/create').post((req, res, next) => {
  User.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});


// Get All Employees
userRoute.route('/').get((req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single user
userRoute.route('/read/:id').get((req, res) => {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


//Login form with password and username in the body
userRoute.route('/login').post((req, res, next) => {
  User.findOne(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)

    }
  })
});

userRoute.route('/updatep/:username').put((req, res, next) => {
  const filter = { username: req.params.username };
  User.findOneAndUpdate(filter, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data);
      console.log('Data updated successfully')
    }
  })
})


// Update employee
userRoute.route('/update/:id').put((req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})


// Delete employee
userRoute.route('/delete/:id').delete((req, res, next) => {
  User.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = userRoute;