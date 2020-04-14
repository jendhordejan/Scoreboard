import React, { useState } from "react";
import "./AddPlayer.css";

export default function AddPlayerForm(props) {
  const initialState = { id: 0, name: "", score: 0 };
  const [newPlayer, set_newPlayer] = useState(initialState);

  const updateField = e => {
    const { name, value } = e.target;
    console.log(`fieldName: ${name} | fieldValue: ${value}`);

    set_newPlayer(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.submitNewPlayer(newPlayer);
  };

  return (
    <div className="AddPlayerForm">
      {console.log("local state: ", newPlayer)}
      <form onSubmit={handleSubmit}>
        <p>
          Name:
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newPlayer.name}
            onChange={updateField}
          />
          <input type="submit" value="Add Player" />
        </p>
        {/* <label>
          Score:
          <input
            type="text"
            name="score"
            placeholder="0"
            value={newPlayer.score}
            onChange={updateField}
          />
        </label> */}
      </form>
    </div>
  );
}
