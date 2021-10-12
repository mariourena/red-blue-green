import React, { useState, useEffect } from "react";
import { CellCoords, CellState, GameGridCells } from "../types/types.game";
import Game from "../classes/class.game";
import { Box } from "@mui/material";
import GameCell from "./GameCell";

interface Props {
  demensions: number;
  resetSwitch: boolean;
  updateClickCount: () => void;
  winGame: () => void;
}

const GameGrid: React.FC<Props> = (props: Props) => {
  const [game, setGame] = useState<Game>();
  const [serializedCells, setCells] = useState<GameGridCells>([]);

  useEffect(() => {
    setGame(new Game(props.demensions, CellState.Red));
  }, [props.resetSwitch, props.demensions]);

  useEffect(() => {
    if (game) {
      setCells(game.getSerializedCells());
    }
  }, [game]);

  /**
   * Single click event handler for page efficiency
   * @param event
   */
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Capture click event target
    const cellElementClicked: HTMLElement | undefined = captureCellFromClick(
      event.target as HTMLElement
    );
    if (cellElementClicked) {
      const coords: CellCoords | undefined =
        getCellCoordsFromElement(cellElementClicked);

      if (coords && game) {
        game.rotateCells(coords);
        setCells(game.getSerializedCells());
        if (game.checkForWin()) {
          props.winGame();
        }
        props.updateClickCount();
      }
    }
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${serializedCells.length}, 1fr)`}
      gap={2}
      onClick={handleClick}
      sx={{ height: "100%" }}
    >
      {serializedCells.map((row, x) =>
        row.map((cell, y) => (
          <GameCell key={`${x}${y}`} cell={cell} />
        ))
      )}
    </Box>
  );
};

export default GameGrid;

// Helpers

/**
 * captureCellFromClick
 * Traverse up DOM in case your click target is a child element in a grid cell
 * Capture the grid cell target in the event bubble chain
 * @param clickTarget
 * @returns HTMLElement | null
 */
function captureCellFromClick(
  clickTarget: HTMLElement
): HTMLElement | undefined {
  while (!isGridCellElement(clickTarget) && clickTarget.parentElement) {
    clickTarget = clickTarget.parentElement;
  }
  return isGridCellElement(clickTarget) ? clickTarget : undefined;
}

/**
 * isGridCellElement
 * Detects if an HTMLElement is grid-cell
 * @param element
 * @returns boolean
 */
function isGridCellElement(element: HTMLElement): boolean {
  return element.classList.contains("grid-cell");
}

/**
 * getCellCoordsFromElement
 * Translate element attributes to a ICellCoords
 * @param cellElementClicked
 * @returns ICellCoords | null
 */
function getCellCoordsFromElement(
  cellElementClicked: HTMLElement
): CellCoords | undefined {
  const { x, y } = cellElementClicked.dataset;
  return x && y
    ? ({
        x: parseInt(x),
        y: parseInt(y),
      } as CellCoords)
    : undefined;
}
