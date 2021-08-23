import "./App.css";
import { useEffect, useState } from "react";
import Board from "./Board";
import Forest from "./img/forest.jpg";
import Setting from "./Setting";

function App() {
  const [keypress, setkeypress] = useState(0);
  const [active, setactive] = useState("");
  const [speed, setspeed] = useState(500);
  const [boardSize, setboardSize] = useState(30);

  useEffect(() => {
    console.log(localStorage);
    if (localStorage.length > 0) {
      setactive(localStorage.getItem("active"));
      setspeed(localStorage.getItem("speed"));
      setboardSize(localStorage.getItem("boardSize"));
    }
  }, []);

  const changeDirection = (e) => {
    // setTimeout(() => {
    //   console.log("hrll");
    // }, 5000);
    if (
      e.keyCode === 38 ||
      e.keyCode === 39 ||
      e.keyCode === 37 ||
      e.keyCode === 40
    ) {
      // setpressedKey(e.keyCode);
      setkeypress(e.keyCode);
    }
  };

  document.addEventListener("keyup", changeDirection);

  const changeActive = (props) => {
    setactive(props);
    localStorage.setItem("active", props);
  };

  const save = ({ speed, boardSize }) => {
    setspeed(speed);
    setboardSize(boardSize);
    localStorage.setItem("speed", speed);
    localStorage.setItem("boardSize", boardSize);
  };

  return (
    <div
      className="center"
      style={{ backgroundImage: `url(${Forest})`, backgroundSize: "cover" }}
    >
      <h1>Snake Fight 2</h1>
      {active === "newGame" && (
        <Board
          speed={speed}
          boardSize={boardSize}
          changeActive={changeActive}
          keypress={keypress}
        />
      )}

      {active === "setting" && (
        <Setting
          save={save}
          changeActive={changeActive}
          speed={speed}
          boardSize={boardSize}
        />
      )}

      {active === "" && (
        <div className="menu">
          <div onClick={() => changeActive("newGame")} className="menuOption">
            New Game
          </div>
          <div onClick={() => changeActive("setting")} className="menuOption">
            Setting
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
