const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/users');
const PORT = require('../../config/port');
const localHost = require('../../config/localHost');
const userFacebook = () => {
     passport.use(new FacebookStrategy({
          clientID: 1898036960240703,
          clientSecret: '346b72bd7f340223fe6d0818ca1c5d8d',
          callbackURL: `http://infinite-ridge-68592.herokuapp.com:${PORT}/users/login/facebook/callback`
     }, (req, accessToken, refreshToken, profile, done) => {
          console.log('qwe', profile);
          let data = profile._json; //статический объект, это свойство которое хранит 
          User
               .findOne({
                    email: data.email,
               })
               .exec()
               .then(user => {
                    if (!user) {
                         const user = new User({
                              email: data.email,
                         });
                    }
               })
               .catch(err => {
                    res.status(500).json(err)
               });
     }));
};
module.exports = userFacebook;