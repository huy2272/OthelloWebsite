import React from "react";
import Piece from "./Piece";

function Position(props) {
  const xCoord = props.xCoord;
  const yCoord = props.yCoord;

  //<Piece color={props.piece} />
  return (
    <button onClick={() => props.onPlay(xCoord, yCoord, props.piece)}>
      <Piece color={props.piece} />
    </button>
  );
}

export default Position;
