import React, { useState } from "react";
import Position from "./Position";

function Board(props) {
  var [player1, player2] = [props.p1, props.p2];

  const [boardState, setboardState] = useState({
    currentPlayer: player1,
    board: [],
  });

  function startGame() {
    let board = [];
    const whitePos = [];
    const blackPos = [];
    for (let y = 0; y < 8; y++) {
      board.push([]);
      for (let x = 0; x < 8; x++) {
        let piece = "empty";
        if ((y === 3 && x === 3) || (y === 4 && x === 4)) {
          piece = "white";
        } else if ((y === 3 && x === 4) || (y === 4 && x === 3)) {
          piece = "black";
        }
        board[y].push(piece);
      }
    }
    setboardState((prev) => ({ ...prev, board: board }));
  }

  function invalidMove() {
    alert("The move played is invalid");
  }

  function checkMoveDirection(
    xDir,
    yDir,
    xCoord,
    yCoord,
    outflank,
    validMoveArray
  ) {
    let opponentPiece =
      boardState.currentPlayer.color === "black" ? "white" : "black";
    let pieceCheckX = xCoord + xDir;
    let pieceCheckY = yCoord + yDir;

    if (
      pieceCheckX > 7 ||
      pieceCheckX < 0 ||
      pieceCheckY > 7 ||
      pieceCheckY < 0
    ) {
      return [];
    }

    let pieceCheck = boardState.board[pieceCheckY][pieceCheckX];

    if (pieceCheck === opponentPiece) {
      let newValidMoveArray = [
        ...validMoveArray,
        { x: pieceCheckX, y: pieceCheckY },
      ];
      return checkMoveDirection(
        xDir,
        yDir,
        pieceCheckX,
        pieceCheckY,
        true,
        newValidMoveArray
      );
    } else if (pieceCheck === boardState.currentPlayer.color && outflank) {
      return validMoveArray;
    } else {
      return [];
    }
  }

  function checkMove(xCoord, yCoord) {
    let piecesToFlip = [];

    for (let theta = 0; theta < 2 * Math.PI; theta += Math.PI / 4) {
      let xDir = Math.round(Math.cos(theta));
      let yDir = Math.round(Math.sin(theta));
      piecesToFlip = [
        ...piecesToFlip,
        ...checkMoveDirection(xDir, yDir, xCoord, yCoord, false, []),
      ];
    }
    return piecesToFlip;
  }

  function flipPieces(positionArray) {}

  function playPosition(xCoord, yCoord, piece) {
    if (boardState.board[yCoord][xCoord] !== "empty") {
      invalidMove();
    } else {
      let positionsToFlip = checkMove(xCoord, yCoord);

      setboardState((prev) => {
        let board = [...prev.board];
        let currentPlayerColor = prev.currentPlayer.color;

        for (let position of positionsToFlip) {
          board[position.y][position.x] = currentPlayerColor;
        }

        if (positionsToFlip.length > 0) {
          board[yCoord][xCoord] = currentPlayerColor;
          return {
            currentPlayer:
              prev.currentPlayer.name === player1.name ? player2 : player1,
            board: board,
          };
        } else {
          invalidMove();
          return prev;
        }
      });
    }
  }

  if (boardState.board.length === 0) {
    startGame();
  }

  return (
    <div className="game">
      <h1>
        It is the turn of {boardState.currentPlayer.name} (
        {boardState.currentPlayer.color})
      </h1>
      <table>
        <tbody>
          {boardState.board.map((row, colKey) => {
            return (
              <tr key={colKey}>
                {row.map((piece, rowKey) => {
                  return (
                    <td key={rowKey}>
                      {
                        <Position
                          onPlay={playPosition}
                          xCoord={rowKey}
                          yCoord={colKey}
                          piece={piece}
                        />
                      }
                    </td>
                  );
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
