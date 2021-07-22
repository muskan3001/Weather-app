const path = require("path");

const express = require("express");
app.set('view engine','hbs')
const pbpath = path.join(__dirname, "../public");
const app = express();
app.use(express.static(pbpath));

app.get("/weather", (req, res) => {
  res.send({
    forecast: "it is rainy today",
    location: "mumbai",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
