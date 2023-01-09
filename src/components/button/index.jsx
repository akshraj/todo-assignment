import React from "react";
import "./button.scss";

export default function Button({ children, onClick,...rest }) {
  return (
    <button {...rest} className="button" onClick={onClick}>
      {children}
    </button>
  );
}
