const express = require('express');
const app = express();


app.get("/", async (req, res) => {
    res.render("dashboard");
});


module.exports = app;