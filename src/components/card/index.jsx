import React from "react";
import "./card.scss";

export default function Card({
  children,
  height,
  width,
  onClick,
  create,
  edit,
}) {
  return (
    <div className="card" style={{ height: height, width: width }}>
      {create || edit ? (
        <div className="closeIcon" onClick={onClick}>
          X
        </div>
      ) : null}
      {children}
    </div>
  );
}
