import React from "react";
import Card from "../../components/Card";
import BackgroundImg from "../../assets/imgs/background.png";
import "./Home.css";
export default function Home() {
  const state = [
    {
      url: "http://localhost:3030/data",
      city: "Cali",
      bgImg: BackgroundImg,
    },
    {
      url: "http://localhost:3030/data",
      city: "Medellin",
      bgImg: BackgroundImg,
    },
    {
      url: "http://localhost:3030",
      city: "Medellin",
      bgImg: BackgroundImg,
    },
  ];

  return (
    <>
      <div className="o-container">
        {state.map(({ url, city, bgImg }, id) => (
          <Card key={id} url={url} city={city} bgImg={bgImg} />
        ))}
      </div>
    </>
  );
}
