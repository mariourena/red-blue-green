import React from "react";
import { 
    CellState, 
    ICellCoords, 
    IGrid, 
    IGridCell } from "../types/grid";
import GridCell from "./GridCell";

const Grid: React.FC<IGrid> = (props: IGrid) => {
   
    const [cells, setCells] = React.useState<IGridCell[][]>(initializeCells(4));

    /**
     * Single click event handler for page efficiency
     * @param event 
     */
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        
        // Capture click event target
        const cellElementClicked: HTMLElement | null = captureCellFromClick(event.target as HTMLElement);

        if (cellElementClicked) {

            const coords: ICellCoords | null = getCellCoordsFromElement(cellElementClicked);

            if (coords) {
                setCells(updateCells(cells, coords).map(row => [...row]));
                if (checkForWin(cells)) {
                    props.winGame();
                }
                props.updateClickCount();
            }

        }
    }

    return <section className="grid" onClick={handleClick}>
        {
            cells.map((row, x) => row.map((cell, y) => 
                <GridCell 
                    key={`${x}${y}`}
                    state={cell.state}
                    coords={cell.coords} 
                />)
            )
        }
    </section>
}

export default Grid;

// Helpers

/**
 * initializeCells
 * Initialize multi-demensional grid-cell array based on demensions
 * @param demensions 
 * @param defaultState 
 * @returns IGridCell[][]
 */
function initializeCells(demensions: number, defaultState: CellState = CellState.Red): IGridCell[][] {
    const cells: IGridCell[][] = [[]];

    for (let x = 0; x < demensions; x++) {
        // Does this row not exist in "cells"?
        if (!cells[x]) {
            // ... add it
            cells.push([]);
        }
        for (let y = 0; y < demensions; y++) {
            cells[x].push({ coords: {x, y}, state: defaultState});
        }
    }

    return cells;
}

/**
 * captureCellFromClick
 * Traverse up DOM in case your click target is a child element in a grid cell
 * Capture the grid cell target in the event bubble chain
 * @param clickTarget 
 * @returns HTMLElement | null 
 */
function captureCellFromClick(clickTarget: HTMLElement): HTMLElement | null {
    while (!isGridCellElement(clickTarget) && clickTarget.parentElement) {
        clickTarget = clickTarget.parentElement;
    }
    return isGridCellElement(clickTarget) ? clickTarget : null;
}

/**
 * isGridCellElement
 * Detects if an HTMLElement is grid-cell
 * @param element 
 * @returns boolean
 */
function isGridCellElement(element: HTMLElement): boolean {
    return element.classList.contains('grid-cell');
}

/**
 * getCellCoordsFromElement
 * Translate element attributes to a ICellCoords
 * @param cellElementClicked 
 * @returns ICellCoords | null
 */
function getCellCoordsFromElement(cellElementClicked: HTMLElement): ICellCoords | null {
    const { x, y } = cellElementClicked.dataset;
    return (x && y) 
        ? {
            x: parseInt(x),
            y: parseInt(y) 
        } as ICellCoords
        : null;
}

/**
 * updateCells
 * 
 * Clicking on a red square turns it blue
 * Clicking on a blue square turns it green, and turns its neighbors blue
 * Clicking on a green square will turn its red neighbors blue and its blue neighbors green
 * The game is completed when all of the squares are green
 * The number of clicks used to turn all squares green should be tracked and shown
 * 
 * @param cells 
 * @param coords 
 * @returns IGridCell[][]
 */
function updateCells(cells: IGridCell[][], coords: ICellCoords): IGridCell[][] {

    if (cells[coords.x] && cells[coords.x][coords.y]) {
        const cell: IGridCell = cells[coords.x][coords.y];
        const neighbors: IGridCell[] = getNeighboringCells(cells, coords);

        switch (cell.state) {
            case CellState.Red: 
                cell.state = CellState.Blue;
                break;
            case CellState.Blue:
                neighbors.forEach(cell => cell.state = CellState.Blue);
                cell.state = CellState.Green;
                break;
            case CellState.Green:
                neighbors.forEach(cell => {
                    switch(cell.state) {
                        case CellState.Red:
                            cell.state = CellState.Blue;
                            break;
                        case CellState.Blue:
                            cell.state = CellState.Green;
                            break;
                    }
                });
                cell.state = CellState.Green;
                break
            default:
                break;
        }
    }

    return cells;
}

/**
 * getNeighboringCells
 * Find neighboring cells in multi-demensional array
 * 
 * @param cells 
 * @param coords 
 * @returns IGridCell[]
 */
function getNeighboringCells(cells: IGridCell[][], coords: ICellCoords): IGridCell[] {
    const neighbors: IGridCell[] = [];
    const selectedRow = cells[coords.x];
    const northRow: IGridCell[] | undefined = cells[coords.x - 1];
    const southRow: IGridCell[] | undefined = cells[coords.x + 1];

    if (selectedRow) {
        neighbors.push(...getRowNeighbors(cells, selectedRow, coords.y, false))
    }

    if (northRow) {
        neighbors.push(...getRowNeighbors(cells, northRow, coords.y))
    }

    if (southRow) {
        neighbors.push(...getRowNeighbors(cells, southRow, coords.y))
    }

    return neighbors;
}

/**
 * getRowNeighbors
 * Given a row in the grid, return neighbors relative to y axis
 * 
 * @param cells 
 * @param row 
 * @param y 
 * @param includeY 
 * @returns IGridCell[]
 */
function getRowNeighbors(cells: IGridCell[][], row: IGridCell[], y: number, includeY: boolean = true): IGridCell[] {
    const neighbors: IGridCell[] = [];

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

/**
 * checkForWin
 * 
 * @param cells 
 * @returns boolean
 */
function checkForWin(cells: IGridCell[][]): boolean {
    const stateSet = new Set(cells
        .reduce((a, b) => [...a, ...b])
        .map(cell => cell.state)
    );
    return stateSet.size === 1 && stateSet.has(CellState.Green);
}