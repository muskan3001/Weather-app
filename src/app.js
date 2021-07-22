const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();

const pbpath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(pbpath));
app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "musssuuu",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "this is about section",
    name: "suarOP",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "this is some useful text",
    title: "this is about section",
    name: "suarOP",
  });
});
app.get("/weather", (req, res) => {
  res.render("help", {
    title: "help section",
    name: "help others",
  });
});
app.get("*", (req, res) => {
  res.send("my 404 page");
});
app.listen(3000, () => {
  console.log("server is up on port 3000");
});
