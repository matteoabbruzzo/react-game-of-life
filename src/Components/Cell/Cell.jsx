import React from "react";
import "./Cell.css";

const cell = props => {
  const status = `Cell ${props.alive ? "Alive" : "Dead"}`;
  return (
    <div
      className={status}
      onClick={() => {
        props.cellClickHandler(props.x, props.y);
      }}
    />
  );
};

export default cell;
