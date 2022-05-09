const express = require('express');
const app = express();


app.get("/", async (req, res) => {
    res.render("profile/new");
});


module.exports = app;