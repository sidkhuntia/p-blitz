const express = require('express');
const app = express();


app.get("/", async (req, res) => {
    res.render("login.ejs");
});


module.exports = app;