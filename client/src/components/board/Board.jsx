import React, { useState } from "react";
import Position from "./Position";
import PlayerCard from "./PlayerCard";
import PieceImage from "./PieceImage";

function Board(props) {
  var [player1, player2] = [
    { name: props.p1name, color: props.p1color },
    { name: props.p2name, color: props.p2color },
  ];

  //boardState is an object containing information about the player whose turn it is currently and about the board
  const [boardState, setboardState] = useState({
    currentPlayer: player1,
    board: props.board,
  });
  const [playerPieceCount, setPlayerPieceCount] = useState({
    player1: 2,
    player2: 2,
  });

  function playPosition(xCoord, yCoord) {
    if (boardState.board[yCoord][xCoord] !== "empty") {
      invalidMove();
    } else {
      let positionsToFlip = checkMove(xCoord, yCoord);

      if (positionsToFlip.length > 0) {
        positionsToFlip.push({ x: xCoord, y: yCoord });
        flipPieces(positionsToFlip);
      } else {
        invalidMove();
      }
    }
  }

  function checkMove(xCoord, yCoord) {
    let piecesToFlip = [];

    //Looping through every direction a move could ouflank the opponent
    for (let theta = 0; theta < 2 * Math.PI; theta += Math.PI / 4) {
      var xDir = Math.round(Math.cos(theta));
      var yDir = Math.round(Math.sin(theta));
      var outflank = false;

      //Adding the outflanked pieces to the pieceToFlip array
      piecesToFlip = [...piecesToFlip, ...directionalCheckMove(xCoord, yCoord)];
    }
    return piecesToFlip;

    function directionalCheckMove(xCoord, yCoord, outflankedPieces = []) {
      let currentPlayerPiece = boardState.currentPlayer.color;
      let opponentPiece = currentPlayerPiece === "black" ? "white" : "black";
      let pieceCheckX = xCoord + xDir;
      let pieceCheckY = yCoord + yDir;

      //Checking if the position being checked is out of bounds
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
        //appending the piece being checked to the array of outflanked pieces
        let newOutflankedPieces = [
          ...outflankedPieces,
          { x: pieceCheckX, y: pieceCheckY },
        ];
        outflank = true;

        //recursively checking the next piece in the same direction
        return directionalCheckMove(
          pieceCheckX,
          pieceCheckY,
          newOutflankedPieces
        );

        //Checking if the piece allows the opponent to be outflanked
      } else if (pieceCheck === currentPlayerPiece && outflank) {
        return outflankedPieces;
      } else {
        return [];
      }
    }
  }

  function flipPieces(positionArray) {
    let board = [...boardState.board];
    let currentPlayerColor = boardState.currentPlayer.color;

    for (let position of positionArray) {
      board[position.y][position.x] = currentPlayerColor;
    }
    setboardState((prevBoard) => {
      return {
        currentPlayer:
          prevBoard.currentPlayer.color === player1.color ? player2 : player1,
        board: board,
      };
    });
    setPlayerPieceCount((prevCount) => {
      if (currentPlayerColor === "black") {
        return {
          player1: prevCount.player1 + positionArray.length,
          player2: prevCount.player2 - positionArray.length + 1,
        };
      } else {
        return {
          player1: prevCount.player1 - positionArray.length + 1,
          player2: prevCount.player2 + positionArray.length,
        };
      }
    });
  }

  function invalidMove() {
    alert("The move played is invalid");
  }

  return (
    <div className="board">
      {props.formSubmit && (
        <div className="topPieceImage">
          <p>{boardState.currentPlayer.name}'s turn</p>
          <PieceImage color={boardState.currentPlayer.color} />
        </div>
      )}
      <div className="boardAndGameCard">
        {props.formSubmit && (
          <PlayerCard
            name={player1.name}
            color={player1.color}
            pieceCount={playerPieceCount.player1}
            current={
              boardState.currentPlayer.color === player1.color ? true : false
            }
          />
        )}
        <div className={!props.formSubmit ? "margins pregame" : "margins"}>
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
        {props.formSubmit && (
          <PlayerCard
            name={player2.name}
            color={player2.color}
            pieceCount={playerPieceCount.player2}
            current={
              boardState.currentPlayer.color === player2.color ? true : false
            }
          />
        )}
      </div>
    </div>
  );
}

export default Board;
