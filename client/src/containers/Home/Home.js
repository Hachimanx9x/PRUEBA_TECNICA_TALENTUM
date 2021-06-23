import React from "react";
import Card from "../../components/Card";
import "./Home.css";
export default function Home() {
  const state = [
    { url: "http://localhost:3030/data", city: "Cali" },
    { url: "http://localhost:3030/data", city: "Medellin" },
    { url: "http://localhost:3030", city: "Medellin" },
  ];

  return (
    <>
      <div className="o-container">
        {state.map(({ url, city }, id) => (
          <Card key={id} url={url} city={city} />
        ))}
      </div>
    </>
  );
}
