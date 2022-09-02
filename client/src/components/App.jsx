import React, { useEffect, useState } from "react";
import Board from "./board/Board";
import UsernameForm from "./usernameForm/UsernameForm";
import WinnerScreen from "./board/gameEndForm/WinnerScreen";

function App() {
  const [backendData, setBackendData] = useState([{}]);
  const [usernameFormData, setUserNameFormData] = useState({
    submit: false,
    playerNames: { p1name: "", p2name: "" },
  });
  const [gameEndStats, setGameEndStats] = useState({
    gameEnd: false,
    winner: "",
  });

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  function gameStart(name) {
    setUserNameFormData({ submit: true, playerNames: name });
  }

  function gameEnd(winner) {
    setGameEndStats({
      gameEnd: true,
      winner: winner,
    });
    // alert(winner.name + " won");
  }

  //Creates a new board
  function defaultBoard() {
    let board = [];

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

    //The board is a 2D array of size 8x8 that represents every piece on the board.
    //It contains the type of piece at each position
    return board;
  }

  return (
    <>
      <h1 className="title">Othello</h1> <br />
      <div className="game">
        {!usernameFormData.submit && (
          <>
            <UsernameForm onSub={gameStart} />
            <Board
              p1name={usernameFormData.playerNames.p1name}
              p1color="black"
              p2name={usernameFormData.playerNames.p2name}
              p2color="white"
              board={defaultBoard()}
              formSubmit={usernameFormData.submit}
              onGameEnd={gameEnd}
            />
          </>
        )}
        {usernameFormData.submit && (
          <>
            {gameEndStats.gameEnd && (
              <WinnerScreen winner={gameEndStats.winner} />
            )}
            <Board
              p1name={usernameFormData.playerNames.p1name}
              p1color="black"
              p2name={usernameFormData.playerNames.p2name}
              p2color="white"
              board={defaultBoard()}
              formSubmit={usernameFormData.submit}
              onGameEnd={gameEnd}
            />
          </>
        )}
      </div>
    </>
  );
}
export default App;
