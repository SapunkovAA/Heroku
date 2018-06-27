const mongoose = require('mongoose');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; //не правильный рекваер,правильный инсталл авторизации, 2е не подключен класс
//3е 
// const User = require('../models/users');
const Social = require('../models/socilalUsers');
const PORT = require('../../config/port');
const localHost = require('../../config/localHost');

const userGoogle = () => {
     passport.use(new GoogleStrategy({
          clientID: '430175608680-k5rm1a736a4lmgp04ti8hukff7pjpa89.apps.googleusercontent.com',
          clientSecret: '2qSI3qNebIGxGtK0XUeYbA5l',
          callbackURL: `http://infinite-ridge-68592.herokuapp.com/users/login/google/callback`
     }, (req, accessToken, refreshToken, profile, done) => {
          console.log('qwe', profile);
          let data = profile._json;

          Social.findOne({id: data.id})
          .exec()
          .then(user => {
              if (!user) {
                  const newUser = new Social({
                      id: data.id,
                      displayName: data.displayName,
                      provider: data.provider
                  });
                  newUser.save();
                  done(null, newUser);
              }

          })
          .catch(err => {
              console.log(err);
          })

     }));
};
module.exports = userGoogle;