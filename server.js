const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Profile = require("./models/profile");

require("./routes/auth");

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }));
app.use(methodOverride("_method"));

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

const authRouter = require("./routes/auth");
const dashboardRouter = require("./routes/dashboard");
const notificationRouter = require("./routes/notification");
const loanRequestRouter = require("./routes/loanrequest");
const profileRouter = require("./routes/profile");
const contactUsRouter = require("./routes/contactus");
const negotiateRouter = require("./routes/negotiateLoan");

var googleUser = new Object();
const isLoggedIn = (req, res, next) => {
  googleUser = req.user;
  exports.user = googleUser;
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

//check wheter profile is created
const isProfileCreated = async (req, res, next) => {
  googleUser = req.user;
  const profile = await Profile.findOne({
    userGoogleID: googleUser.id.toString(),
  });
  if (profile) {
    next();
  } else {
    res.redirect("/profile");
  }
};

const isLogged = (req, res, next) => {
  googleUser = req.user;
  exports.user = googleUser;
  if (req.user) {
    next();
  } else {
    res.render("login");
  }
};

const isEligible = async (req, res, next) => {
  googleUser = req.user;
  const profile = await Profile.findOne({
    userGoogleID: googleUser.id.toString(),
  });
  if (profile.cibilScore >=312) {
    next();
  } else {
    res.redirect("/dashboard");
  }
}


app.get("/login", isLogged, (req, res) => {
  res.redirect("/dashboard");
});

app.use("/", authRouter);
app.use("/dashboard", isLoggedIn, dashboardRouter);
app.use("/notification", isLoggedIn, notificationRouter);
app.use("/loanrequest",isLoggedIn, isProfileCreated,isEligible, loanRequestRouter);
app.use("/profile", isLoggedIn, profileRouter);
app.use("/contactus", contactUsRouter);
app.use("/negotiate",isLoggedIn,isProfileCreated, negotiateRouter);

app.get("/", isLoggedIn, (req, res) => {
  // res.render("index", { user: req.user.displayName });
  res.redirect("/dashboard");
});

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/login");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
