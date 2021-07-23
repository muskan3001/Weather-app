const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { request } = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
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
    name: "Muskan",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "this is about section",
    name: "Muskan",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    helpText:
      "Head over to Weather section.Type any location and hit the search button. ",
    title: "Help",
    name: "Muskan",
  });
});
app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "Please provide a valid address",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "muskan",
    errorMessage: "page not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    name: "muskan",
    errorMessage: "this cannot be found",
  });
});
app.listen(3000, () => {
  console.log("server is up on port 3000");
});
