import React from "react";
import Piece from "./Piece";

function Position(props) {
  const xCoord = props.xCoord;
  const yCoord = props.yCoord;

  function click() {
    if (props.clickable) {
      props.onPlay(xCoord, yCoord);
    }
  }

  //<Piece color={props.piece} />
  return (
    <button onClick={() => click()}>
      <Piece color={props.piece} />
    </button>
  );
}

export default Position;
