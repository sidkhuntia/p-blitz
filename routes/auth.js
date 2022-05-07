var express = require("express");
const passport = require("passport");
require("dotenv").config();
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
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
