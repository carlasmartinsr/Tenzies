import React from "react";

export default function Scoreboard(props) {
  return (
    <div className="scoreboard-container">
      <div>
        <p className="rolls">{props.countRoll}</p>
        <p className="rolls">Rolls</p>
      </div>
      <div>
        <p>
          {(props.minutes < 10 ? "0" : "") + props.minutes}:
          {(props.seconds < 10 ? "0" : "") + props.seconds}{" "}
        </p>
        <p>Timer</p>
      </div>
    </div>
  );
}
