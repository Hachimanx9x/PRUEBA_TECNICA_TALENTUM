import { useState, useEffect } from "react";
import { dataWeather } from "./types";
import bgCard from "../../assets/imgs/background.png";
import humidity from "../../assets/icons/humidity.png";
import temp from "../../assets/icons/temp.png";
import wind from "../../assets/icons/wind.png";
//styled
import "./styled.css";
//interfaces

type AddPropsDataItem = {
  imgSrc: any;
  description: string;
  data: any;
  border?: boolean;
};

type AddProps = {
  dataWeather: dataWeather;
};
//functions

function Month(number: number): string {
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
  //number += 1;
  return month[number];
}
const DataItem = ({
  imgSrc,
  description,
  data,
  border = true,
}: AddPropsDataItem) => (
  <div className={border ? "o-item-data  o-border" : "o-item-data"}>
    <div className="o-info">
      <img src={imgSrc} alt={description} /> {description}
    </div>
    <p>
      {data} {description === "Velocidad Viento" ? "m/s" : ""}{" "}
    </p>
  </div>
);
export default function CardTemplate({ dataWeather }: AddProps) {
  const [dateInfo, setDateInfo] = useState("");
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
      {/*first section  */}
      <div className="o-card__head o-card__head-bg">
        <div className="o-data__localization">
          <h3>
            {dataWeather.location === "Cali"
              ? "SANTIAGO DE CALI"
              : dataWeather.location}
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
      <style>
        {` .o-card__head-bg {
            background-image: url(${bgCard});
            
          }`}
      </style>
    </>
  );
}
