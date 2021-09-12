import React from "react";
import Card from "./components/Card";
import "./App.css";

function App() {
  const state = ["cali", "load", ""];
  return (
    <div className="o-container">
      {state.map((ele, idx) => (
        <Card key={`card${idx}`} city={ele} />
      ))}
    </div>
  );
}

export default App;
