const request = require("request");

fetchForecast = (lat, lng, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/666f3db26eb3923aa49b7d40d3f86b0d/${lat},${lng}`,
      json: true
    },
    (err, response, body) => {
      if (err) {
        console.log(err);
      }
      if (response.statusCode === 200) {
        callback(undefined, {
          temperature: ((body.currently.temperature - 32) * 5) / 9,
          apparentTemperature:
            ((body.currently.apparentTemperature - 32) * 5) / 9
        });
      } else {
        callback("Unable to fetch weather");
      }
    }
  );
};

module.exports.fetchForecast = fetchForecast;
