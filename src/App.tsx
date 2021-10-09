import React from "react";
import { GameState } from "./types/grid";
import GameGrid from "./components/GameGrid";
import GameStats from "./components/GameStats";
import { Box, Container, Typography } from "@mui/material";

const App: React.FC = () => {
  const [clickCount, setClickCount] = React.useState<number>(0);
  const [gameState, setGameState] = React.useState<GameState>(GameState.NotWon);

  const updateClickCount = () => {
    if (gameState === GameState.NotWon) {
      setClickCount(clickCount + 1);
    }
  };
  const winGame = () => setGameState(GameState.Won);
  const resetGame = () => {
    setClickCount(0);
    setGameState(GameState.NotWon);
  };

  return (
    <>
      <Container maxWidth="lg" className="App">
        <Box
          display="grid"
          gridTemplateColumns="1fr 2fr"
          gap={2}
          sx={{ height: "100vh" }}
        >
          <Box sx={{ position: "relative" }}>
            <Typography
              component="div"
              variant="h1"
              sx={{ color: "cadetblue" }}
            >
              Welcome!
            </Typography>
            <Box
              sx={{
                backgroundColor: "#eee",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              <Typography component="aside">
                Win the game by getting all the squares to turn green. Start by
                clicking any square in the grid. The square will either change
                color and/or the color of its neighbors.
                <em>Let's Play!</em>
              </Typography>
            </Box>
            <GameStats
              clickCount={clickCount}
              gameState={gameState}
              resetGame={resetGame}
            />
          </Box>
          <Box sx={{ padding: "5vh 5vw" }}>
            <GameGrid
              clickCount={clickCount}
              updateClickCount={updateClickCount}
              winGame={winGame}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default App;
