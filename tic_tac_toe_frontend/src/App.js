import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import { calculateWinner } from './utils/gameUtils';

// PUBLIC_INTERFACE
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const status = winner === 'draw' 
    ? "Game Over - It's a Draw!" 
    : winner 
      ? `Winner: ${winner}` 
      : `Next Player: ${xIsNext ? 'X' : 'O'}`;

  // PUBLIC_INTERFACE
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  // PUBLIC_INTERFACE
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="App">
      <div className="game">
        <h1 className="game-title">Tic Tac Toe</h1>
        <div className="game-board">
          <Board squares={squares} onClick={handleClick} />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <button className="reset-button" onClick={resetGame}>
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
