const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./../database/models/user');
const options = {
    secretOrKey: 'counter-strike',
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};
passport.use(new JwtStrategy(options, function(jwt_payload, done) {
    User.findById(jwt_payload.id).then(user => {
        if(!user) {
            done(null, false);
        }
        done(null, user);
    }).catch(error => {
        done(error);
    });
}));
module.exports = passport;
