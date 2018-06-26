const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/users');

const userFacebook = () => {
     passport.use(new FacebookStrategy({
          clientID: 1898036960240703,
          clientSecret: '346b72bd7f340223fe6d0818ca1c5d8d',
          callbackURL: "http://localhost:3000/users/login/facebook/callback"
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