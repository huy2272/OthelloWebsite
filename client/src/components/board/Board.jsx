import React, { useState } from "react";
import Position from "./Position";
import PlayerCard from "./PlayerCard";
import PieceImage from "./PieceImage";

function Board(props) {
  var [player1, player2] = [
    { name: props.p1name, color: props.p1color },
    { name: props.p2name, color: props.p2color },
  ];
  var gameEnded = false;
  var formSubmit = props.formSubmit;

  //boardState is an object containing information about the player whose turn it is currently and about the board
  const [boardState, setboardState] = useState({
    currentPlayer: player1,
    board: props.board,
  });
  const [playerPieceCount, setPlayerPieceCount] = useState({
    player1count: 2,
    player2count: 2,
  });
  const [gameEnd, setGameEnd] = useState({
    end: false,
    winner: "",
  });

  // const [gameEnd, setGameEnd] = useState({
  //   gameEnded: false,
  //   winner: "",
  // });

  function checkWinner(player, player1count, player2count) {
    const pieceTotal = player1count + player2count;
    let winner = "";

    if (pieceTotal === 64) {
      if (player1count > player2count) {
        winner = player1;
      } else if (player2count > player1count) {
        winner = player2;
      } else {
        winner = "__ draw";
      }
      // setGameEnd({
      //   gameEnded: true,
      //   winner: winner,
      // });
      setGameEnd({
        end: true,
        winner: winner,
      });
      props.onGameEnd(winner.name);
      return true;
    } else if (checkAvailableMoves(player).length === 0) {
      if (player.name === player1.name) {
        winner = player2;
      } else {
        winner = player1;
      }
      // setGameEnd({
      //   gameEnded: true,
      //   winner: winner,
      // });
      setGameEnd({
        end: true,
        winner: winner,
      });
      props.onGameEnd(String(winner.name));
      return true;
    }

    return false;
  }

  function checkAvailableMoves(player) {
    let availableMoves = [];
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        let posToFlip = checkMove(player, x, y);
        if (posToFlip.length > 0) {
          availableMoves.push({
            xCoord: x,
            yCoord: y,
            posFlipped: posToFlip.length,
          });
        }
      }
    }
    console.log(availableMoves);
    return availableMoves;
  }

  function playPosition(xCoord, yCoord) {
    let currentPlayer = boardState.currentPlayer;
    if (boardState.board[yCoord][xCoord] !== "empty") {
      invalidMove();
    } else {
      let positionsToFlip = checkMove(currentPlayer, xCoord, yCoord);

      if (positionsToFlip.length > 0) {
        positionsToFlip.push({ x: xCoord, y: yCoord });
        flipPieces(positionsToFlip);
      } else {
        invalidMove();
      }
    }
  }

  function checkMove(player, xCoord, yCoord) {
    let piecesToFlip = [];

    if (boardState.board[yCoord][xCoord] !== "empty") {
      return [];
    }

    //Looping through every direction a move could ouflank the opponent
    for (let theta = 0; theta < 2 * Math.PI; theta += Math.PI / 4) {
      var xDir = Math.round(Math.cos(theta));
      var yDir = Math.round(Math.sin(theta));
      var outflank = false;

      //Adding the outflanked pieces to the pieceToFlip array
      piecesToFlip = [
        ...piecesToFlip,
        ...directionalCheckMove(player, xCoord, yCoord),
      ];
    }
    return piecesToFlip;

    function directionalCheckMove(
      player,
      xCoord,
      yCoord,
      outflankedPieces = []
    ) {
      let currentPlayerPiece = player.color;
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
          player,
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
    let currentPlayer = boardState.currentPlayer;
    let opponent = currentPlayer.name === player1.name ? player2 : player1;
    let currentPlayerColor = currentPlayer.color;

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

    let p1pieceCount = playerPieceCount.player1count;
    let p2pieceCount = playerPieceCount.player2count;
    if (currentPlayerColor === "black") {
      p1pieceCount += positionArray.length;
      p2pieceCount += -positionArray.length + 1;
    } else {
      p1pieceCount += -positionArray.length + 1;
      p2pieceCount += positionArray.length;
    }

    setPlayerPieceCount({
      player1count: p1pieceCount,
      player2count: p2pieceCount,
    });
    checkWinner(opponent, p1pieceCount, p2pieceCount);
  }

  function invalidMove() {
    alert("The move played is invalid");
  }

  return (
    <div className="board">
      {formSubmit && (
        <div className="topPieceImage">
          <p>{boardState.currentPlayer.name}'s turn</p>
          <PieceImage color={boardState.currentPlayer.color} />
        </div>
      )}
      <div className="boardAndGameCard">
        {formSubmit && (
          <PlayerCard
            name={player1.name}
            color={player1.color}
            pieceCount={playerPieceCount.player1count}
            current={
              boardState.currentPlayer.color === player1.color ? true : false
            }
            gameEnded={gameEnd.end}
          />
        )}
        <div
          className={!formSubmit || gameEnd.end ? "margins pregame" : "margins"}
        >
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
                              clickable={!gameEnded && formSubmit}
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
            pieceCount={playerPieceCount.player2count}
            current={
              boardState.currentPlayer.color === player2.color ? true : false
            }
            gameEnded={gameEnd.end}
          />
        )}
      </div>
    </div>
  );
}

export default Board;
