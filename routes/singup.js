const express = require('express');
const app = express();


app.get("/", async (req, res) => {
    res.render("signup");
});


module.exports = app;