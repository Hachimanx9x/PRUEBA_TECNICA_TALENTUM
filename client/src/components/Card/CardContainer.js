import React from "react";
import "./Card.css";
export default function CardContainer({ children, className = "o-card" }) {
  return <div className={className}>{children}</div>;
}
