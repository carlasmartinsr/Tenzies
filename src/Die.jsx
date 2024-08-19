import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#35CE8D" : "#F9E784",
  };

  return (
    <div
      className="dice-face"
      style={styles}
      onClick={props.holdDice}
      key={props.id}
    >
      <div className={`dice-dot dice ${props.dots}`}></div>
    </div>
  );
}
