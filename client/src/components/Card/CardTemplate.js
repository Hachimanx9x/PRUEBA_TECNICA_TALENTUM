import { useState, useEffect } from "react";
import CardContainer from "./CardContainer";
import humidity from "../../assets/icons/humidity.png";
import temp from "../../assets/icons/temp.png";
import wind from "../../assets/icons/wind.png";
import "./Card.css";

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
const DataItem = ({ imgSrc, description, data, border = true }) => (
  <div className={border ? "o-item-data  o-border" : "o-item-data"}>
    <div className="o-info">
      <img src={imgSrc} alt={description} /> {description}
    </div>
    <p>{data}</p>
  </div>
);

export default function CardTemplate({ dataWeather, bgImg }) {
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
      {/*card with information */}
      <CardContainer>
        {/*first section  */}
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
              <span>Clima</span> / {dataWeather.weather}
            </p>
          </div>
        </div>
        {/*second section  */}
        <div className="o-card__body">
          <DataItem
            imgSrc={temp}
            description="Temperatura"
            data={dataWeather.temperature}
          />
          <DataItem
            imgSrc={humidity}
            description="Húmedad"
            data={dataWeather.humidity}
          />
          <DataItem
            imgSrc={wind}
            description="Velocidad Viento"
            data={dataWeather.windSpeed}
            border={false}
          />
        </div>
      </CardContainer>
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
