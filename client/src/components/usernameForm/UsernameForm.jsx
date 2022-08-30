import React, { useState } from "react";
import NameInput from "./NameInput";

function UsernameForm(props) {
  const [playerNames, setPlayerNames] = useState({ p1name: "", p2name: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setPlayerNames((prev) => ({ ...prev, [name]: value }));
  }

  function submitNames(event) {
    event.preventDefault();
    const { p1name, p2name } = playerNames;
    if (
      String(p1name.match(/\S+/)) === p1name &&
      String(p2name.match(/\S+/)) === p2name &&
      p1name.toLocaleLowerCase() !== p2name.toLocaleLowerCase()
    ) {
      props.onSub(playerNames);
    } else {
      alert("The names entered are invalid");
    }
  }

  return (
    <div className="formContainer">
      <form className="usernameForm" onSubmit={(event) => submitNames(event)}>
        <h1>Enter your names</h1>
        <NameInput
          value={playerNames.p1name}
          name="p1name"
          onTyping={handleChange}
        />
        <NameInput
          value={playerNames.p2name}
          name="p2name"
          onTyping={handleChange}
        />
        <input className="nameSubmit" type="submit" />
      </form>
    </div>
  );
}

export default UsernameForm;
