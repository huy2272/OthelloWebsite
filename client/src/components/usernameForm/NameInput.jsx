import React from "react";

function NameInput(props) {
  const placeholder = props.name === "p1name" ? "Player 1" : "Player 2";

  return (
    <input
      type="text"
      value={props.value}
      onChange={(event) => {
        props.onTyping(event);
      }}
      placeholder={placeholder}
      name={props.name}
    />
  );
}

export default NameInput;
