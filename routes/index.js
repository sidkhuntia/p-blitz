const express = require('express');
const app = express();
const user = require("../server")


app.get("/", async (req, res) => {
    res.render("index");
});


module.exports = app;