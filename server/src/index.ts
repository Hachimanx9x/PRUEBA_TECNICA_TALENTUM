import express from "express";
import cors from "cors";
import chalk from "chalk";
import { readFileSync } from "fs";
//interface
type resultApi = {
  name: any;
  main: { temp: number; humidity: any };
  wind: { speed: any };
  weather: { main: string }[];
};
type dataWeather = {
  location?: string;
  temperature?: number;
  humidity?: number;
  windSpeed?: number;
  weather?: string;
};
function Weather(info: string) {
  if (info === "Clouds") {
    return "Nublado";
  }
  if (info === "Sunny") {
    return "Soleado";
  }
  if (info === "Rainy") {
    return "Lluvioso";
  }
}
//variables
let weather: any = null;
//functions
function _default(location: string) {
  return {
    location: location,
    temperature: 0,
    humidity: 0,
    windSpeed: 0,
    weather: "Nublado",
  };
}
function KelvinToCelsius(kelvin: number) {
  return kelvin - 273.15;
}
function filterInfo(data: resultApi): dataWeather {
  return {
    location: data.name,
    temperature: KelvinToCelsius(data.main.temp),
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    weather: Weather(data.weather[0].main),
  };
}
// init
const app = express();
// settings express
app.set("PORT", process.env.PORT || 3030);
// middleware
app.use(cors()); //cors

//routes GET

app.get("/weather/city=:key", (req, res) => {
  const { key } = req.params;
  console.log(chalk.bgGreen(`GET /weather/city=${key}`));
  if (key === "cali") {
    res.json(weather);
  } else if (key === "load") {
  } else {
    res.json(_default(key));
  }
});

app.listen(app.get("PORT"), () => {
  const raw = readFileSync(`${__dirname}/../data/weather.json`).toString(
    "utf8"
  );
  const data = JSON.parse(raw);
  weather = filterInfo(data);
  //console.log(weather);
  console.log(
    chalk.blue(`server running on http://localhost:${app.get("PORT")}`)
  );
});
