import React, { useState, useEffect } from "react";
import { Button, Grid, GridColumn, GridRow } from "semantic-ui-react";

export default function Setting(props) {
  const [speed, setspeed] = useState(props.speed);
  const [boardSize, setboardSize] = useState(props.boardSize);

  const save = () => {
    props.save({ speed, boardSize });
  };
  return (
    <>
      <Grid width="2">
        <GridRow textAlign="centered">
          <h2 className="heading">Setting</h2>
        </GridRow>
        <GridRow textAlign="centered">
          <label className="heading" style={{ fontSize: "20px" }}>
            Choose Speed -
          </label>
        </GridRow>
        <GridRow textAlign="centered">
          <select
            style={{ width: "180px", height: "30px" }}
            value={speed}
            onChange={(e) => setspeed(e.target.value)}
          >
            <option value={1000}>slow</option>
            <option value={800}>medium</option>
            <option value={600}>fast</option>
            <option value={500}>super Fast</option>
          </select>
        </GridRow>
        <GridRow textAlign="centered">
          <label className="heading" style={{ fontSize: "20px" }}>
            Choose Board Size -
          </label>
        </GridRow>
        <GridRow textAlign="centered">
          <select
            style={{ width: "180px", height: "30px" }}
            value={boardSize}
            onChange={(e) => setboardSize(e.target.value)}
          >
            <option value={25}>small</option>
            <option value={30}>medium</option>
            <option value={35}>big</option>
            <option value={40}>super big</option>
          </select>
        </GridRow>
        <GridRow textAlign="centered">
          <GridColumn>
            <Button positive onClick={save}>
              Save
            </Button>
          </GridColumn>
          <GridColumn>
            <Button negative onClick={() => props.changeActive("")}>
              Exit
            </Button>
          </GridColumn>
        </GridRow>
      </Grid>
    </>
  );
}
