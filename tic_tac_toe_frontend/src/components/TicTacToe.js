import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Board from './Board';
import { calculateWinner } from '../utils/gameUtils';

// PUBLIC_INTERFACE
function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const status = winner === 'draw' 
    ? "Game Over - It's a Draw!" 
    : winner 
      ? `Winner: ${winner}` 
      : `Next Player: ${xIsNext ? 'X' : 'O'}`;

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
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
        <Link to="/" className="menu-button">Back to Menu</Link>
      </div>
    </div>
  );
}

export default TicTacToe;
