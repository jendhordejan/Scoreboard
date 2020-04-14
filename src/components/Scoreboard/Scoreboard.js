// src/components/Scoreboard.js
import React, { useState } from "react";
import Player from "../Player/Player";
import AddPlayer from "../AddPlayer/AddPlayerForm";
import "./Scoreboard.scss";

export default function Scoreboard() {
  const [players, set_players] = useState([
    { id: 1, name: "Martijn", score: 11 },
    { id: 2, name: "Jend", score: 14 },
    { id: 3, name: "Emmie", score: 4 },
    { id: 4, name: "Sophie", score: 42 }
  ]);

  const [sort_by, set_sort_by] = useState("score");

  const submitNewPlayer = playerData => {
    console.log("submitNewPlayer");
    const newPlayer = {
      id: Math.trunc(Math.random() * 10000),
      name: playerData.name,
      score: parseInt(playerData.score)
    };

    set_players(prevState => {
      return [...prevState, newPlayer];
    });
  };

  const increaseScore = id => {
    console.log("increaseScore id: ", id);
    const playerList = players;
    console.log("playerList: ", playerList);
    const updatePlayers = playerList.map(p =>
      p.id === id ? { ...p, score: p.score + 1 } : p
    );
    console.log("updatePlayers: ", updatePlayers);
    set_players([...updatePlayers]);
  };

  const resetScores = () => {
    const playerList = players;
    const resetPlayerScores = playerList.map(player =>
      player.score > 0 ? { ...player, score: 0 } : player
    );

    set_players([...resetPlayerScores]);
  };

  const randomizeScore = () => {
    console.log("randomizeScore");
    const playerList = players;
    const resetPlayerScores = playerList.map(player =>
      player.score > -1
        ? { ...player, score: Math.trunc(Math.random() * 100) }
        : player
    );

    set_players([...resetPlayerScores]);
  };

  function compare_score(player_a, player_b) {
    return player_b.score - player_a.score;
  }

  function compare_name(player_a, player_b) {
    return player_a.name.localeCompare(player_b.name);
  }

  let sortedArray = [...players].sort(compare_score);

  switch (sort_by) {
    case "name":
      sortedArray = [...players].sort(compare_name);
      break;

    default:
      [...players].sort(compare_score);
      break;
  }

  const change_sorting = event => {
    console.log("new sort order:", event.target.value);
    set_sort_by(event.target.value);
  };

  return (
    <div>
      <div className="scoreboard">
        <h1>Scoreboard</h1>
        <p>
          Sort order:{" "}
          <select onChange={change_sorting}>
            <option value="score">Sort by score</option>
            <option value="name">Sort by name</option>
          </select>
          <emp>
            <b>--</b>
          </emp>
          <button onClick={resetScores}>Reset</button>
          <emp>
            <b>--</b>
          </emp>
          <button onClick={randomizeScore}>Randomize</button>
        </p>

        {sortedArray.map(player => (
          <ul>
            <Player player={player} increaseScore={increaseScore} />
          </ul>
        ))}
      </div>

      <div className="scoreboard">
        <AddPlayer submitNewPlayer={submitNewPlayer} />
      </div>
    </div>
  );
}
