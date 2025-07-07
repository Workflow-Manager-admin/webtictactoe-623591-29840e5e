import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
function Snake() {
  const [snake, setSnake] = useState([[0, 0]]);
  const [food, setFood] = useState([5, 5]);
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  
  const gridSize = 20;
  
  const generateFood = useCallback(() => {
    const newFood = [
      Math.floor(Math.random() * gridSize),
      Math.floor(Math.random() * gridSize)
    ];
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake([[0, 0]]);
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    generateFood();
    setGameStarted(false);
  };

  const checkCollision = (head) => {
    // Wall collision
    if (
      head[0] < 0 || 
      head[0] >= gridSize || 
      head[1] < 0 || 
      head[1] >= gridSize
    ) {
      return true;
    }
    
    // Self collision
    for (let i = 1; i < snake.length; i++) {
      if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
        return true;
      }
    }
    return false;
  };

  const moveSnake = useCallback(() => {
    if (gameOver || !gameStarted) return;

    const newSnake = [...snake];
    const head = [...newSnake[0]];

    switch (direction) {
      case 'UP':
        head[1] -= 1;
        break;
      case 'DOWN':
        head[1] += 1;
        break;
      case 'LEFT':
        head[0] -= 1;
        break;
      case 'RIGHT':
        head[0] += 1;
        break;
      default:
        break;
    }

    if (checkCollision(head)) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    if (head[0] === food[0] && head[1] === food[1]) {
      setScore(score + 1);
      generateFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, gameOver, gameStarted, score, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted) {
        setGameStarted(true);
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStarted]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 150);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  return (
    <div className="game">
      <h1 className="game-title">Snake</h1>
      <div className="snake-container">
        <div className="snake-grid" 
             style={{
               display: 'grid',
               gridTemplateColumns: `repeat(${gridSize}, 20px)`,
               gap: '1px',
               padding: '15px'
             }}>
          {Array.from({ length: gridSize * gridSize }).map((_, index) => {
            const x = index % gridSize;
            const y = Math.floor(index / gridSize);
            const isSnake = snake.some(segment => segment[0] === x && segment[1] === y);
            const isFood = food[0] === x && food[1] === y;
            
            return (
              <div
                key={index}
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'var(--bg-secondary)'
                }}
                className={`snake-cell ${isSnake ? 'snake-segment' : ''} ${isFood ? 'snake-food' : ''}`}
              />
            );
          })}
        </div>
        <div className="game-info">
          <div className="status">Score: {score}</div>
          {!gameStarted && !gameOver && (
            <div className="status">Press any key to start</div>
          )}
          {gameOver && (
            <div className="status">Game Over! Final Score: {score}</div>
          )}
          <button className="reset-button" onClick={resetGame}>
            {gameOver ? 'Play Again' : 'Reset Game'}
          </button>
          <Link to="/" className="menu-button">Back to Menu</Link>
        </div>
      </div>
    </div>
  );
}

export default Snake;
