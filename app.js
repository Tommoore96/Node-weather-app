const geocode = require("./fetches/location.js");
const forecast = require("./fetches/forecast.js");
const yargs = require("yargs");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch the weather for.",
      string: true
    }
  })
  .help()
  .alias("h", "help").argv;

const encodedAddress = encodeURIComponent(argv.address);

geocode.fetchLocation(encodedAddress, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    forecast.fetchForecast(
      results.latitude,
      results.longitude,
      (errorMessage, results) => {
        if (errorMessage) {
          console.log(errorMessage);
        } else {
          console.log(
            `Apparently it's ${Math.round(results.temperature * 10) /
              10}, but it feels like ${Math.round(
              results.apparentTemperature * 10
            ) / 10}`
          );
        }
      }
    );
  }
});
