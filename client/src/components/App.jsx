import React, { useEffect, useState } from "react";
import Board from "./board/Board";
import UsernameForm from "./usernameForm/UsernameForm";
import LeaderBoard from './leaderboard/LeaderBoard';

function App() {
  const [backendData, setBackendData] = useState([{}]);
  const [usernameFormData, setUserNameFormData] = useState({
    submit: false,
    playerNames: { p1name: "", p2name: "" },
  });

  //Random data for leaderboard
  //Can be put into JSON file later
  const items = [
    {
      id: 'e1',
      title: 'player1',
      amount: 3
    },
    {
      id: 'e2',
      title: 'player2',
      amount: 9,
    },
    {
      id: 'e3',
      title: 'player3',
      amount: 10,
    },
    {
      id: 'e4',
      title: 'player4',
      amount: 4,
    },
  ];



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
    <div className="game">
      <div>
      {usernameFormData.submit ? (
        <Board
          p1name={usernameFormData.playerNames.p1name}
          p1color="black"
          p2name={usernameFormData.playerNames.p2name}
          p2color="white"
          board={defaultBoard()}
        />
      ) : (
        <UsernameForm onSub={gameStart} />
      )}
      </div>
      <div>
        <h1 align='center'>Top Players</h1>
        <LeaderBoard items = {items}/>
      </div>
    </div>
  );
}

export default App;
