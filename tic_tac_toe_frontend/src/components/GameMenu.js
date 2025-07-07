import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
function GameMenu() {
  return (
    <div className="game-menu">
      <h1 className="game-title">Choose a Game</h1>
      <div className="menu-buttons">
        <Link to="/tictactoe" className="menu-button">Tic Tac Toe</Link>
        <Link to="/snake" className="menu-button">Snake</Link>
      </div>
    </div>
  );
}

export default GameMenu;
