import React from "react";
import "./style.css";

import humidity from "../../assets/icons/humidity.png";
import temp from "../../assets/icons/temp.png";
import wind from "../../assets/icons/wind.png";

import { useState, useEffect } from "react";
import { Get } from "../../utils/Fetch";
export default function Card() {
  const [dataWeather, setDataWeather] = useState(null);
  const [dateInfo, setDateInfo] = useState();
  useEffect(async () => {
    await Get("http://localhost:3030/data", "Cali").then((response) => {
      setDataWeather({
        location: response.name,
        temperature: KelvinToCelsius(response.main.temp),
        humidity: response.main.humidity,
        windSpeed: response.wind.speed,
        weather: Weather(response.weather[0].main),
      });
    });

    const DateInfo = new Date();
    //day number , month name, year number
    setDateInfo(
      `${DateInfo.getDate()} ${Month(
        DateInfo.getMonth()
      )} ${DateInfo.getFullYear()}`
    );
  }, []);

  if (dataWeather) {
    return (
      <div className="o-card">
        <div className="o-card__head o-card__head-bg">
          <div className="o-data__localization">
            <h3>
              {dataWeather.location == "Cali"
                ? "SANTIAGO DE CALI"
                : "OTHER LOCATION"}
            </h3>
            <h5>{dateInfo}</h5>
            <h2>{dataWeather.temperature}°</h2>
          </div>
          <div className="o-data__description">
            <p>
              {" "}
              <span>Clima</span> / {dataWeather.weather}
            </p>
          </div>
        </div>
        <div className="o-card__body">
          <div className="o-item-data  o-border">
            <div className="o-info">
              <img src={temp} /> Temperatura
            </div>

            <p>{dataWeather.temperature}</p>
          </div>

          <div className="o-item-data  o-border">
            <div className="o-info">
              <img src={humidity} /> Húmedad
            </div>

            <p>{dataWeather.humidity}%</p>
          </div>
          <div className="o-item-data">
            <div className="o-info">
              <img src={wind} /> Velocidad Viento
            </div>

            <p>{dataWeather.windSpeed} m/s</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="o-card">
        <div className="o-card__head o-card__head-bg">
          <div className="o-data__localization">
            <h3>CARGANDO ...</h3>
            <h5>CARGANDO ...</h5>
            <h2>CARGANDO ...</h2>
          </div>
          <div className="o-data__description">
            <p>
              {" "}
              <span>Clima</span> / CARGANDO{" "}
            </p>
          </div>
        </div>
        <div className="o-card__body">
          <div className="o-item-data  o-border">
            <div className="o-info">
              <img src={temp} /> Temperatura
            </div>

            <p>CARGANDO ...</p>
          </div>

          <div className="o-item-data  o-border">
            <div className="o-info">
              <img src={humidity} /> Húmedad
            </div>

            <p>CARGANDO ...</p>
          </div>
          <div className="o-item-data">
            <div className="o-info">
              <img src={wind} /> Velocidad Viento
            </div>

            <p>CARGANDO ... m/s</p>
          </div>
        </div>
      </div>
    );
  }
}
/**
 *
 */
function Month(number) {
  const month = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  number += 1;
  return month[number];
}

function KelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

function Weather(info) {
  if (info == "Clouds") {
    return "Nublado";
  }
  if (info == "Sunny") {
    return "Soleado";
  }
  if (info == "Rainy") {
    return "Lluvioso";
  }
}
