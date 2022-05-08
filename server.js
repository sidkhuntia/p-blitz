const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

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

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const dashboardRouter = require("./routes/dashboard");
const signupRouter = require("./routes/singup")
const notificationRouter = require("./routes/notification")

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
};
// app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/dashboard", isLoggedIn, dashboardRouter);
app.use("/signup", signupRouter);
app.use("/notification",isLoggedIn, notificationRouter);

//check if user is logged in
app.get("/", isLoggedIn, (req, res) => {
  // console.log(req.user);
  // res.send(`Welcome ${req.user.displayName}`);
  res.render("index", { user: req.user.displayName });

  app.use("/", indexRouter);
});

//if user is not logged in, redirect to login page
app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/login");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}.....`);
});
