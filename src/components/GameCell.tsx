import React from "react";
import { CellState, GameCell as GameCellProps } from "../types/types.game";
import { Box } from "@mui/material";

const stateToCellColor: Map<CellState, string> = new Map();
stateToCellColor.set(CellState.Blue, "blue");
stateToCellColor.set(CellState.Green, "green");
stateToCellColor.set(CellState.Red, "red");

const GameCell: React.FC<GameCellProps> = (props: GameCellProps) => (
  <Box
    className="grid-cell"
    data-testid="grid-cell"
    data-state={props.state}
    data-x={props.coords.x}
    data-y={props.coords.y}
    sx={{ backgroundColor: stateToCellColor.get(props.state) }}
  />
);

export default GameCell;
