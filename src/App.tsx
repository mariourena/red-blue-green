import React from "react";
import { GameState } from "./types/types.game";
import { Box, Container, Typography } from "@mui/material";
import Confetti from "react-confetti";
import GameGrid from "./components/GameGrid";
import GameStats from "./components/GameStats";

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
          gap={5}
          sx={{ height: "100vh", padding: "5vh 5vw" }}
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
          <Box>
            <GameGrid
              clickCount={clickCount}
              updateClickCount={updateClickCount}
              winGame={winGame}
            />
          </Box>
        </Box>
      </Container>
      {gameState === GameState.Won && (
        <Confetti
          style={{ height: "100vh", width: "100vw" }}
          width={1000}
          height={1000}
        />
      )}
    </>
  );
};

export default App;
