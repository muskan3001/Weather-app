const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=56ed26c118c0bfeb46e9ad09875628c7&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find locations", undefined);
    } else {
      const degree = body.current.temperature;
      const prep = body.current.precip;
      //   callback(response.body.current.weather_descriptions[0]);
      callback(
        undefined,
        `It is currently ${degree} degrees out. There is a ${prep}% chance of rain `
      );
    }
  });
};
module.exports = forecast;
