const express = require('express');
const app = express();


app.get("/", async (req, res) => {
    res.render("notification");
});


module.exports = app;