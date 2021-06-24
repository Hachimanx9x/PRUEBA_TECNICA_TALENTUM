import React from "react";
import CardContainer from "./CardContainer";
import { ErrorIcon } from "../Icons";
import "./Card.css";
export default function ErrorCard({ infoError = 404 }) {
  return (
    <CardContainer>
      <div className="o-card-error">
        <ErrorIcon className="o-icon_warning " />
        <h3>
          {infoError === 404
            ? "City no found"
            : infoError === 403
            ? "Key not valid"
            : "Unknown error"}
        </h3>
      </div>
    </CardContainer>
  );
}
