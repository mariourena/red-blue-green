import React from "react";
import { CellState, GameCell as GameCellType } from "../types/types.game";
import { Box } from "@mui/material";

const stateToCellColor: Map<CellState, string> = new Map();
stateToCellColor.set(CellState.Blue, "blue");
stateToCellColor.set(CellState.Green, "green");
stateToCellColor.set(CellState.Red, "red");

interface GameCellProps {
  cell: GameCellType;
}

const GameCell: React.FC<GameCellProps> = ({ cell }: GameCellProps) => (
  <Box
    className="grid-cell"
    data-testid="grid-cell"
    data-state={cell.state}
    data-x={cell.coords.x}
    data-y={cell.coords.y}
    sx={{ backgroundColor: stateToCellColor.get(cell.state) }}
  />
);

export default GameCell;
