import React, { useState, useEffect, memo } from "react";

function Cell(props) {
  const [snakeCell, setsnakeCell] = useState(false);
  const [foodCell, setfoodCell] = useState(false);
  useEffect(() => {
    setsnakeCell(false);
    props.snakeArray.map((element) => {
      if (element[0] === props.element[0] && element[1] === props.element[1]) {
        setsnakeCell(true);
      }
    });
  }, [props.snakeArray]);

  useEffect(() => {
    setfoodCell(false);
    if (
      props.foodCell[0] === props.element[0] &&
      props.foodCell[1] === props.element[1]
    ) {
      setfoodCell(true);
    }
  }, [props.foodCell]);

  useEffect(() => {
    props.snakeArray.map((element) => {
      if (
        element[0] === props.foodCell[0] &&
        element[1] === props.foodCell[1]
      ) {
        props.eatFood();
      }
    });
  });

  return (
    <>
      {!foodCell && (
        <div className={snakeCell ? "snake" : "boardCell"}></div> //
      )}
      {foodCell && <div className="food"></div>}
    </>
  );
}

export default memo(Cell);
