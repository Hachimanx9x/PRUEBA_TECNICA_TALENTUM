import { useState, useEffect } from "react";

import { Get } from "../../utils/Fetch";

import Card from "../../components/Card";
export default function Home() {
  const [dataWeather, setDataWeather] = useState(null);
  useEffect(async () => {
    await Get("http://localhost:3030/data", "Cali").then((response) =>
      setDataWeather(response)
    );
  }, []);

  return (
    <div>
      <Card />
    </div>
  );
}
