import React, { useState } from "react";
import Position from "./Position";

function Board() {
  const [positionArray, setPositionArray] = useState([]);

  function startGame() {
    let board = [];
    const whitePos = [];
    const blackPos = [];
    for (let x = 0; x < 8; x++) {
      board.push([]);
      for (let y = 0; y < 8; y++) {
        let piece = "empty";
        if ((x === 3 && y === 3) || (x === 4 && y === 4)) {
          piece = "white";
        } else if ((x === 3 && y === 4) || (x === 4 && y === 3)) {
          piece = "black";
        }
        board[x].push(
          <Position onPlay={playPosition} xCoord={x} yCoord={y} piece={piece} />
        );
      }
    }
    setPositionArray(board);
  }

  function playPosition(xCoord, yCoord) {
    alert("Player has pressed the position: " + xCoord + ", " + yCoord);
  }

  if (positionArray.length === 0) {
    startGame();
  }

  return (
    <div className="game">
      <table>
        <tbody>
          {positionArray.map((row, key) => {
            return (
              <tr key={key}>
                {row.map((pos, key) => {
                  return <td key={key}>{pos}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Board;
