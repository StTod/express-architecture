'use strict';

const passport = require('passport');
const LocalPassport = require('passport-local');
const User = require('mongoose').model('User');

module.exports = () => {
    passport.use( new LocalPassport( (username, password, done) => {
        User.findOne({ username: username }).then(user => {
            if (!user) return done(null, false);
            if (!user.authenticate(password)) return done(null, false);
            return done(null, user);
        });        
    }));
};