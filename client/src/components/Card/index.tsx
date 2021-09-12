import React, { useState, useEffect } from "react";
import { GET } from "../../utils/Fetch";
import { dataWeather } from "./types";
import CardTemplate from "./CardTemplate";
import CardError from "./CardError";
import CardLoading from "./CardLoading";
import "./styled.css";
//interface
interface AddProps {
  city: string;
}

//component
export default function Card({ city }: AddProps) {
  const [dataWeather, setDataWeather] = useState<dataWeather | null>(null);
  const [errorCard, setErrorCard] = useState(0);

  useEffect(() => {
    GET({ city })
      .then((response: dataWeather) => {
        //console.log(response);
        setDataWeather(response);
      })
      .catch((err: any) => {
        setErrorCard(err);
        console.log(err);
      });
  }, [city]);

  if (errorCard) {
    return (
      <div className="o-card">
        <CardError infoError={errorCard} />
      </div>
    );
  }

  if (dataWeather) {
    return (
      <div className="o-card">
        <CardTemplate dataWeather={dataWeather} />
      </div>
    );
  }

  return (
    <div className="o-card">
      <CardLoading />
    </div>
  );
}
