import React, { useEffect, useState } from "react";
import Board from "./board/Board";

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  return (
    <Board
      p1={{ name: "P1", color: "black" }}
      p2={{ name: "P2", color: "white" }}
    />
  );
}

export default App;
