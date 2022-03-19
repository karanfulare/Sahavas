const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID: "582235234953-5onuov2u6blq09e7f59sc5aa28n2lt3c.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
},

function(accessToken, refreshtoken, profile, done){
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
        if(err){
            console.log("error in google startegy passport",err);
            return;
        }
        console.log(profile);

        if(user){
            return done(null,user);
        }
        else{
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },
            function(err,user){
                if(err){console.log('error in creting user google passport strategy');return;}

                return done(null,user);
            })
        }
    })
}

));

module.exports= passport;
