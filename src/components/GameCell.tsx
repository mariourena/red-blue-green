import React from "react";
import { IGridCell, CellState } from "../types/grid";
import { Box } from "@mui/material";

const stateToCellColor: Map<CellState, string> = new Map();
stateToCellColor.set(CellState.Blue, "blue");
stateToCellColor.set(CellState.Green, "green");
stateToCellColor.set(CellState.Red, "red");

const GameCell: React.FC<IGridCell> = (props: IGridCell) => (
  <Box
    className="grid-cell"
    data-state={props.state}
    data-x={props.coords.x}
    data-y={props.coords.y}
    sx={{ backgroundColor: stateToCellColor.get(props.state) }}
  />
);

export default GameCell;
