const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const userFacebook = require('./loginByFacebook');
const userGoogle = require('./loginByGoogle');
const googleMiddleware = require('../middleWares/googleAuthMiddleware');
const PORT = require('../../config/port');
const localHost = require('../../config/localHost');


userFacebook();
userGoogle();

router.post('/signup', function (req, res, next) {
  User.findOne({
      email: req.body.email,
    })
    .exec()
    .then(user => {
      if (user) {
        res.status(200).json({
          message: "there is a user already with this email"
        })
      } else {
        if (req.body.password) {
          bcrypt.hash(req.body.password, 10)
            .then(hash => {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
              });
              return user.save();
            })
            .then(() => {
              res.status(201).json({
                message: "User was created",
              });
            })
            .catch(err => {
              res.status(500).json(err)
            });
        } else {
          res.status(400).json({
            error: "No password field"
          });
        }

      }
    })

});


router.post('/login', function (req, res, next) {
  User.findOne({
      email: req.body.email,
    })
    .exec()
    .then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, function (err, result) {
          if (err) {
            res.status(500).json({
              message: "password  is not match"
            })
          } else {
            const token = jwt.sign({
              email: user.email,
              _id: user._id
            }, 'secretWord');
            res.status(200).json({
              message: "Congratulation",
              userToken: token
            })

          }
        })

      } else {
        res.status(404).json({
          message: "email not found"
        })
      }
    })

})
router.get('/', function (req, res, next) {
  User.find()
    .select('-password')
    .exec()
    .then(users => {
      res.status(200).json({
        message: "list of all users",
        allUsers: users
      });
    })
    .catch(err => {
      res.status(500).json(err)
    });

});

router.get('/login/facebook', passport.authenticate('facebook'));

router.get('/login/facebook/callback', (req, res) => {
  res.redirect(`../../routes/products/`)
});

router.get('/login/google', passport.authenticate('google', {
  scope: ['profile'] //???????{ scope: ['https://www.googleapis.com/auth/plus.login'] }; что такое скоуп
}));

router.get('/login/google/callback', (req, res) => {
  res.redirect(`../../routes/products/`)
});
//здесь ап вместо роут
// router.get('/login/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

module.exports = router;