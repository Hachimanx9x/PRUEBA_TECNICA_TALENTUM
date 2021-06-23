import React from "react";
import "./Card.css";

import humidity from "../../assets/icons/humidity.png";
import temp from "../../assets/icons/temp.png";
import wind from "../../assets/icons/wind.png";

import { useState, useEffect } from "react";
import { Get } from "../../utils/Fetch";
//Icon loading
function IconLoading({ className }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </svg>
  );
}
//Error Icon
function ErrorIcon({ className }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}
//Loading Card
function LoadingCard() {
  return (
    <div className="o-card">
      <div className="o-card-loading">
        <IconLoading className="o-icon " />
        <h3>Cargando</h3>
      </div>
    </div>
  );
}
//Error Card
function ErrorCard({ infoError }) {
  return (
    <div className="o-card">
      <div className="o-card-error">
        <ErrorIcon className="o-icon_warning " />
        <h3>{infoError}</h3>
      </div>
    </div>
  );
}

//  Card Template
function CardTemplate({ dataWeather, bgImg }) {
  const [dateInfo, setDateInfo] = useState();
  useEffect(() => {
    // console.log(bgImg);
    const DateInfo = new Date();
    //day number , month name, year number
    setDateInfo(
      `${DateInfo.getDate()} ${Month(
        DateInfo.getMonth()
      )} ${DateInfo.getFullYear()}`
    );
  }, []);
  return (
    <>
      {" "}
      <div className="o-card">
        <div className="o-card__head o-card__head-bg">
          <div className="o-data__localization">
            <h3>
              {dataWeather.location === "Cali"
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
              <img src={temp} alt="Temperature" /> Temperatura
            </div>

            <p>{dataWeather.temperature}</p>
          </div>

          <div className="o-item-data  o-border">
            <div className="o-info">
              <img src={humidity} alt="Humidity" /> Húmedad
            </div>

            <p>{dataWeather.humidity}%</p>
          </div>
          <div className="o-item-data">
            <div className="o-info">
              <img src={wind} alt="Wind" /> Velocidad Viento
            </div>

            <p>{dataWeather.windSpeed} m/s</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .o-card__head-bg {
          background-image: url(${bgImg});
          background-size: cover;
          background-repeat: no-repeat;
        }
      `}</style>
    </>
  );
}

export default function Card({ url, city, bgImg }) {
  const [dataWeather, setDataWeather] = useState(null);
  const [errorCard, setErrorCard] = useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await Get(url, city).then((response) => {
      if (!response.Error) {
        setDataWeather({
          location: response.name,
          temperature: KelvinToCelsius(response.main.temp),
          humidity: response.main.humidity,
          windSpeed: response.wind.speed,
          weather: Weather(response.weather[0].main),
        });
      } else {
        setErrorCard(response.Error);
      }
    });
  }, []);

  if (dataWeather) {
    return <CardTemplate dataWeather={dataWeather} bgImg={bgImg} />;
  } else if (errorCard) {
    return <ErrorCard infoError={errorCard} />;
  } else {
    return <LoadingCard />;
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
