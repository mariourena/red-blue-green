import { CellState, CellCoords, GameCell } from "../types/types.game";

export default class Game {
  private cells: GameCell[][];

  constructor(demensions: number, defaultState: CellState = CellState.Red) {
    this.cells = this.generateCells(demensions, defaultState);
  }

  checkForWin(): boolean {
    const stateSet = new Set(
      this.cells.reduce((a, b) => [...a, ...b]).map((cell) => cell.state)
    );
    return stateSet.size === 1 && stateSet.has(CellState.Green);
  }

  generateCells(demensions: number, defaultState: CellState): GameCell[][] {
    const cells: GameCell[][] = [[]];

    for (let x = 0; x < demensions; x++) {
      // Does this row not exist in "cells"?
      if (!cells[x]) {
        // ... add it
        cells.push([]);
      }
      for (let y = 0; y < demensions; y++) {
        cells[x].push({ coords: { x, y }, state: defaultState });
      }
    }

    return cells;
  }

  getSerializedCells(): GameCell[][] {
    return this.cells.map((row) => [...row]);
  }

  myNeighbors(cell: GameCell): GameCell[] {
    const neighbors: GameCell[] = [];
    const { x, y } = cell.coords;
    const selectedRow = this.cells[x];
    const northRow: GameCell[] | undefined = this.cells[x - 1];
    const southRow: GameCell[] | undefined = this.cells[x + 1];

    if (selectedRow) {
      neighbors.push(...this.getRowNeighbors(selectedRow, y, false));
    }

    if (northRow) {
      neighbors.push(...this.getRowNeighbors(northRow, y));
    }

    if (southRow) {
      neighbors.push(...this.getRowNeighbors(southRow, y));
    }

    return neighbors;
  }

  getRowNeighbors(
    row: GameCell[],
    y: number,
    includeY: boolean = true
  ): GameCell[] {
    const neighbors: GameCell[] = [];

    if (includeY) {
      neighbors.push(row[y]);
    }
    if (row[y - 1]) {
      neighbors.push(row[y - 1]);
    }
    if (row[y + 1]) {
      neighbors.push(row[y + 1]);
    }

    return neighbors;
  }

  rotateCells(coords: CellCoords): void {
    if (this.cells[coords.x] && this.cells[coords.x][coords.y]) {
      const cell: GameCell = this.cells[coords.x][coords.y];
      const neighbors: GameCell[] = this.myNeighbors(cell);

      switch (cell.state) {
        case CellState.Red:
          cell.state = CellState.Blue;
          break;
        case CellState.Blue:
          neighbors.forEach((cell) => (cell.state = CellState.Blue));
          cell.state = CellState.Green;
          break;
        case CellState.Green:
          neighbors.forEach((cell) => {
            switch (cell.state) {
              case CellState.Red:
                cell.state = CellState.Blue;
                break;
              case CellState.Blue:
                cell.state = CellState.Green;
                break;
            }
          });
          cell.state = CellState.Green;
          break;
        default:
          break;
      }
    }
  }
}
