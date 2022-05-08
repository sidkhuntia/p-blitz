const express = require("express");
const app = express();
const Author = require("../models/author");

//author home page
app.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index.ejs", {
      authors: authors,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

//create author route
app.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    res.redirect("/authors/" + newAuthor.id);
  } catch (error) {
    res.render("authors/new.ejs", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
});


module.exports = app;
