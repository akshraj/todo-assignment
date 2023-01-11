import React from "react";
import "./card.scss";

export default function Card({ children, height, width, onClick, closeBtn }) {
  return (
    <div className="card" style={{ height: height, width: width }}>
      {closeBtn ? (
        <div className="closeIcon" onClick={onClick}>
          X
        </div>
      ) : null}
      {children}
    </div>
  );
}
