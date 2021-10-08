import React from 'react';
import { GameState } from "./types/grid";
import Grid from './components/Grid';
import './App.css';

const App: React.FC = () => {
  const [clickCount, setClickCount] = React.useState<number>(0);
  const [gameState, setGameState] = React.useState<GameState>(GameState.NotWon);

  const updateClickCount = () => setClickCount(clickCount + 1);
  const winGame = () => setGameState(GameState.Won);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the <span className="red">red</span>, <span className="blue">blue</span>, <span className="green">green</span> game!</h1>
        <aside>To win, set all the boxes to green...</aside>
      </header>
      <main>
        { gameState === GameState.Won && <h1>You Win!!!</h1>}
        <Grid updateClickCount={updateClickCount} winGame={winGame} />
      </main>
      <footer>
        <aside>Click count {clickCount}</aside>
      </footer>
    </div>
  );
}

export default App;
