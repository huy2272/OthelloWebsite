import React from "react";
import blackPiece from "./boardImg/blackpiece.png";
import whitePiece from "./boardImg/whitepiece.png";

function PieceImage(props) {
  return (
    <div className="imgContainer">
      <img src={props.color === "black" ? blackPiece : whitePiece} />
    </div>
  );
}

export default PieceImage;
