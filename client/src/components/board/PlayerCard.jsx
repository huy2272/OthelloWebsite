import React from "react";
import PieceImage from "./PieceImage";
import redTriangle from "./boardImg/redtriangle.png";

function PlayerCard(props) {
  return (
    <div className="playerCardAndArrow">
      {props.current && !props.gameEnded && (
        <img className="redArrow" src={redTriangle} />
      )}
      <div className={"playerCard " + props.color}>
        <PieceImage color={props.color} />
        <h1>{props.name}</h1>
        <p>Piece Count: {props.pieceCount}</p>
      </div>
    </div>
  );
}

export default PlayerCard;
