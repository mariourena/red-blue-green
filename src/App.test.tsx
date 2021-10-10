import React from "react";
import { render, screen } from "@testing-library/react";
import { GameState } from "./types/types.game";
import App from "./App";
import GameGrid from "./components/GameGrid";
import GameStats from "./components/GameStats";


describe("Functional Requirements", () => {
  test("renders instructions to win, to user", () => {
    render(<App />);
    const linkElement = screen.getByText(/green/i);
    expect(linkElement).toBeInTheDocument();
  });
  
  test("renders click count, to user", () => {
    render(<App />);
    const linkElement = screen.getByText(/clicks/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders a 4x4 grid", () => {
    render(<App/>);
    const gridCellElements = screen.getAllByTestId("grid-cell");
    expect(gridCellElements.length).toEqual(16);
  });
});

describe("GameGrid Component", () => {

  test("Can initialize with correct cell count", () => {
    const testWithNumber = 10;
    render(<GameGrid demensions={testWithNumber} resetSwitch={true} updateClickCount={()=>{}} winGame={()=>{}} />);
    const gridCellElements = screen.getAllByTestId("grid-cell");
    expect(gridCellElements.length).toEqual(testWithNumber*testWithNumber);
  })

  test("Can update click count", () => {

    let clicks = 0;

    const updateClickCount = () => {
      clicks++;
    }

    render(<GameGrid demensions={1} resetSwitch={true} updateClickCount={updateClickCount} winGame={()=>{}} />);
    
    expect(clicks).toEqual(0);
    
    const gridCellElements = screen.getAllByTestId("grid-cell");

    gridCellElements[0].click();

    expect(clicks).toEqual(1);
  })

  test("Can win game", () => {

    let gameWon = false;

    const winGame = () => {
      gameWon = true;
    }

    render(<GameGrid demensions={1} resetSwitch={true} updateClickCount={()=>{}} winGame={winGame} />);
    
    expect(gameWon).toBe(false);
    
    const gridCellElements = screen.getAllByTestId("grid-cell");

    gridCellElements[0].click(); // blue
    gridCellElements[0].click(); // green

    expect(gameWon).toBe(true);
  })

});

describe("GameStats Component", () => {

  test("renders game stats title", () => {
    render(<GameStats clickCount={0} gameState={GameState.NotWon} resetGame={() => {}} />);
    const titleElement = screen.getByText(/game stats/i);
    expect(titleElement).toBeInTheDocument();
  })

  test("renders win message", () => {
    render(<GameStats clickCount={0} gameState={GameState.Won} resetGame={() => {}} />);
    const winElement = screen.getByText(/win/i);
    expect(winElement).toBeInTheDocument();
  })

  test("renders click count", () => {
    render(<GameStats clickCount={12} gameState={GameState.NotWon} resetGame={() => {}} />);
    const countElement = screen.getByText(/12/i);
    expect(countElement).toBeInTheDocument();
  })

  test("can reset game", () => {
    let reset = false;

    const resetGame = () => {
      reset = true;
    }

    render(<GameStats clickCount={0} gameState={GameState.NotWon} resetGame={resetGame} />);
    
    expect(reset).toBe(false);
    
    const resetButtonElement = screen.getByTestId("reset-button");

    resetButtonElement.click();

    expect(reset).toBe(true);
  });



});

