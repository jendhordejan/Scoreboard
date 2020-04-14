import React from "react";
import "./Player.scss";

export default function Player(props) {
  return (
    <li className="Player" id={props.player.id}>
      <div
        className="percentage_coloring"
        style={{ width: props.player.score + "%" }}
      />
      <p>
        {props.player.name} (score: {props.player.score})
        <button onClick={() => props.increaseScore(props.player.id)}>
          Increment
        </button>
      </p>
    </li>
  );
}
