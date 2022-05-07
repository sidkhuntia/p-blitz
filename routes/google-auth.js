const passport =require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "932567434616-7kh7fjg2fooedknmq10hlkv239pfkgkh.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback   : true
},
function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
}
));