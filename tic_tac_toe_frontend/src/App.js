import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import GameMenu from './components/GameMenu';
import TicTacToe from './components/TicTacToe';
import Snake from './components/Snake';

// PUBLIC_INTERFACE
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GameMenu />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/snake" element={<Snake />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
