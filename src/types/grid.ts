export enum CellState { 
    Blue = "Blue",
    Green = "Green",
    Red = "Red", 
}

export enum GameState {
    NotWon,
    Won
}

export interface ICellCoords {
    x: number;
    y: number;
}

export interface IGridCell {
    state: CellState;
    coords: ICellCoords;
}

export interface IGrid {
    updateClickCount: () => void;
    winGame: () => void;
}

