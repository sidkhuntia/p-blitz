var express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

var app = express();

app.get("/login", function (req, res, next) {
  res.render("login");
});

app.get("/login/federated/google", passport.authenticate("google"));

module.exports = app;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "932567434616-7kh7fjg2fooedknmq10hlkv239pfkgkh.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/oauth2/redirect/google",
      scope: ["profile"],
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
app.get("/login/federated/google", passport.authenticate("google"));
app.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
