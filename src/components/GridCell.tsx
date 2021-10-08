import React from "react";
import { IGridCell } from "../types/grid";

const GridCell: React.FC<IGridCell> = (props: IGridCell) => <div 
    className="grid-cell"
    data-state={props.state}
    data-x={props.coords.x}
    data-y={props.coords.y}
/>

export default GridCell;
