import React from "react";
import CardContainer from "./CardContainer";
import { IconLoading } from "../Icons";
import "./Card.css";
export default function LoadingCard() {
  return (
    <CardContainer>
      <div className="o-card-loading">
        <IconLoading className="o-icon " />
        <h3>Cargando</h3>
      </div>
    </CardContainer>
  );
}
