import React from "react";
import "./styled.css";
//functions
function ErrorIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function CarrError({ infoError = 404 }) {
  return (
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
  );
}
