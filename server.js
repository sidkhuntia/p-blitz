const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");


const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use("/public",express.static("public"));
app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }));


const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
app.use("/", indexRouter);
app.use("/login", loginRouter)


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}.....`);
});
