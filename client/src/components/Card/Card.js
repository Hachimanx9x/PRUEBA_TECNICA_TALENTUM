import { useState, useEffect } from "react";
import { Get } from "../../utils/Fetch";

import CardTemplate from "./CardTemplate";
import ErrorCard from "./ErrorCard"; //  Card Template
import LoadingCard from "./LoadingCard"; //Loading Card
import "./Card.css";

export default function Card({ url, city, bgImg }) {
  const [dataWeather, setDataWeather] = useState(null);
  const [errorCard, setErrorCard] = useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await Get(url, city)
      .then((response) => {
        //  console.log(response);
        setDataWeather({
          location: response.name,
          temperature: KelvinToCelsius(response.main.temp),
          humidity: response.main.humidity,
          windSpeed: response.wind.speed,
          weather: Weather(response.weather[0].main),
        });
      })
      .catch((err) => {
        setErrorCard(err.Error);
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
