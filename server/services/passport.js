const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup options for JWT strategy
const jwtOptions = {};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    
    
    // Does the UserID in the payload exists in our database?
    User.findById(payload.subdomains, function(err, user) {
        if (err) {
            return done(err, false);
        }
        
        // Yes => Call 'done' with a user object and it is authenticated
        if (user) {
            done(null, user)
        } else {
            // No => Call 'done' without a user object and it is not authenticated
            if (user) {
            done(null, false)
        }
    });
});

// Tell passport to use this strategy
