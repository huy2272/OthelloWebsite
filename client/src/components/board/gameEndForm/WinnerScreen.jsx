import React from "react";

function WinnerScreen(props) {
  function playAgain(event) {
    event.preventDefault();
    alert("Play Again");
  }

  return (
    <div className="formContainer" onSubmit={(event) => playAgain(event)}>
      <form className="gameForm">
        <h1>
          {props.winner === "__ draw"
            ? "DRAW"
            : "The Winner is " + props.winner + "!"}
        </h1>
        <input className="gameSubmit" type="submit" value="Play Again" />
      </form>
    </div>
  );
}

export default WinnerScreen;
