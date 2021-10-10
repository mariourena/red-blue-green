export enum CellState {
  Blue = "Blue",
  Green = "Green",
  Red = "Red",
}

export enum GameState {
  NotWon,
  Won,
}

export interface CellCoords {
  x: number;
  y: number;
}

export interface GameCell {
  state: CellState;
  coords: CellCoords;
}

export type GameGridCells = GameCell[][];
