import React from "react";
import blackPiece from "./boardImg/blackpiece.png";
import whitePiece from "./boardImg/whitepiece.png";

function Piece(props) {
  let color = " ";

  if (props.color === "white") {
    color = <img className="piece" src={whitePiece} alt="not found" />;
  } else if (props.color === "black") {
    color = <img className="piece" src={blackPiece} alt="not found" />;
  }

  return <>{color}</>;
}

export default Piece;
