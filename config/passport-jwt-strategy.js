const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExractJWT = require('passport-jwt').ExtractJwt;

let User = require('../models/user');


let opts = {
    jwtFromRequest: ExractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: 'codeial'
}

passport.use(new JWTstrategy(opts, function(jwtPayLoad, done){

    User.findById(jwtPayLoad._id, function(err,user){
        if(err){
            console.log('error in finding user from jwt');
            return ;
        }
        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    })
}));

module.exports = passport;