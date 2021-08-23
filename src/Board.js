import "./App.css";
import React, { useState, useEffect } from "react";
import Cell from "./component/Cell";
import grass from "./img/grass.jpg";
import { Button, Grid, GridColumn, GridRow, Segment } from "semantic-ui-react";

function Board(props) {
  const [boardLength, setboardLength] = useState(Number(props.boardSize));
  const [boardArray, setboardArray] = useState([]);
  const [snakeArray, setsnakeArray] = useState([
    [5, 7],
    [5, 6],
    [5, 5],
  ]);
  const [foodCell, setfoodCell] = useState([10, 10]);
  const [rightDirection, setrightDirection] = useState(true);
  const [leftDirection, setleftDirection] = useState(false);
  const [upDirection, setupDirection] = useState(false);
  const [downDirection, setdownDirection] = useState(false);
  const [plusCell, setplusCell] = useState([0, +1]);
  const [eat, seteat] = useState(false);
  const [randomNumber, setrandomNumber] = useState([9, 9]);
  const [foodNextFind, setfoodNextFind] = useState(true);
  const [currentScore, setcurrentScore] = useState(0);
  const size = Number(14 * boardLength);

  useEffect(() => {
    console.log("1st useeffect");
    setboardArray([]);
    for (let index = 1; index <= boardLength; index = index + 1) {
      for (let j = 1; j <= boardLength; j++) {
        setboardArray((prev) => [...prev, [index, j]]);
      }
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      moveSnake(plusCell);
    }, props.speed); //timeout added because to move snake every 0.3ms
  }, [snakeArray]);

  useEffect(() => {
    movementSnake(props.keypress);
  }, [props.keypress]);

  useEffect(() => {
    snakeArray.map((element, id) => {
      for (let index = 0; index < snakeArray.length; index++) {
        if (
          element[0] === snakeArray[index][0] &&
          element[1] === snakeArray[index][1] &&
          id !== index
        ) {
          console.log("cell");
          reset();
        }
      }
    });
  }, [snakeArray]);

  const movementSnake = (props) => {
    if (props === 38 && !downDirection) {
      // addMinusY();
      setplusCell([-1, 0]);
      // moveSnake(-100);
      setrightDirection(false);
      setleftDirection(false);
      setupDirection(true);
      setdownDirection(false);
    } else if (props === 39 && !leftDirection) {
      // addPlusX();
      setplusCell([0, +1]);
      // moveSnake(+1);
      setrightDirection(true);
      setleftDirection(false);
      setupDirection(false);
      setdownDirection(false);
    } else if (props === 37 && !rightDirection) {
      // addMinusX();
      setplusCell([0, -1]);
      // moveSnake(-1);
      setrightDirection(false);
      setleftDirection(true);
      setupDirection(false);
      setdownDirection(false);
    } else if (props === 40 && !upDirection) {
      // addPlusY();
      setplusCell([+1, 0]);
      // moveSnake(+100);
      setrightDirection(false);
      setleftDirection(false);
      setupDirection(false);
      setdownDirection(true);
    }
  };

  const moveSnake = (props) => {
    const tail = snakeArray[snakeArray.length - 1];
    snakeArray.unshift([
      snakeArray[0][0] + props[0],
      snakeArray[0][1] + props[1],
    ]);
    snakeArray.pop();
    if (eat === true) {
      snakeArray.push([tail[0], tail[1]]);
      seteat(false);
    }
    setsnakeArray([...snakeArray]);
    checkWall();
  };

  const eatFood = () => {
    seteat(true);
    generateRandomNumber(1, boardLength);
    setcurrentScore(currentScore + 1);
  };
  const generateRandomNumber = (min, max) => {
    const random = Math.floor(Math.random() * (max - min) + min);
    const random1 = Math.floor(Math.random() * (max - min) + min);
    setrandomNumber([random, random1]);
    VerifyRandomNumber();
  };
  const VerifyRandomNumber = () => {
    setfoodNextFind(false);
    snakeArray.map((element) => {
      if (element[0] === randomNumber[0] && element[1] === randomNumber[1]) {
        console.log("hello 1st if");
        setfoodNextFind(false);
      } else {
        setfoodNextFind(true);
      }
    });
    if (foodNextFind === true) {
      setfoodCell(randomNumber);
    } else {
      generateRandomNumber(1, boardLength);
    }
  };
  const reset = () => {
    window.location.reload(false);
  };

  const checkWall = () => {
    snakeArray.map((element) => {
      if (
        element[0] > boardLength ||
        element[1] < 1 ||
        element[1] > boardLength ||
        element[0] < 1
      ) {
        reset();
      }
    });
  };
  return (
    <div>
      <Grid>
        <GridRow>
          <div
            className="board"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundImage: `url(${grass})`,
              backgroundSize: "cover",
            }}
          >
            {boardArray.map((element, id) => {
              return (
                <Cell
                  element={element}
                  key={id}
                  eatFood={eatFood}
                  foodCell={foodCell}
                  snakeArray={snakeArray}
                  reset={reset}
                />
              );
            })}
          </div>
        </GridRow>
        <GridRow textAlign="centered">
          <GridColumn>
            <Button negative onClick={() => props.changeActive("")}>
              Exit
            </Button>
          </GridColumn>
          <GridColumn>
            {" "}
            <h2>Score:{currentScore}</h2>
          </GridColumn>
        </GridRow>
      </Grid>
    </div>
  );
}

export default React.memo(Board);
