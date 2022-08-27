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

  return <Board />;
}

export default App;
