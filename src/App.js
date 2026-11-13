
import { useState } from 'react';

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares) {
  for (const [a, b, c] of WINNING_LINES) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return {
        player: squares[a],
        line: [a, b, c],
      };
    }
  }

  return null;
}

function Square({ value, onClick, isWinning }) {
  return (
    <button
      className={`square ${
        value ? `square-${value.toLowerCase()}` : ''
      } ${isWinning ? 'square-winning' : ''}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default function App() {
  const [history, setHistory] = useState([
    Array(9).fill(null),
  ]);

  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const winner = calculateWinner(currentSquares);

  const isDraw =
    !winner && currentSquares.every(Boolean);

  function handlePlay(index) {
    if (winner || currentSquares[index]) return;

    const nextSquares = currentSquares.slice();

    nextSquares[index] = xIsNext ? 'X' : 'O';

    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      nextSquares,
    ];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  function restartGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const status = winner
    ? `Player ${winner.player} wins!`
    : isDraw
      ? "It's a draw!"
      : `Player ${xIsNext ? 'X' : 'O'}'s turn`;

  return (
    <main className="page">
      <section className="game-card">

        <div className="eyebrow">
          A LITTLE FRIENDLY COMPETITION
        </div>

        <h1>Tic-Tac-Toe</h1>

        <p className="subtitle">
          Take turns, make a line, and claim the win.
        </p>

        <div className={`status ${winner ? 'status-win' : ''}`}>
          <span className="status-dot"></span>
          {status}
        </div>

        <div className="board">
          {currentSquares.map((value, index) => (
            <Square
              key={index}
              value={value}
              onClick={() => handlePlay(index)}
              isWinning={Boolean(
                winner?.line.includes(index)
              )}
            />
          ))}
        </div>

        <button
          className="restart-button"
          onClick={restartGame}
        >
          Start a new game
        </button>

        <div className="history">
          <h2>Move history</h2>

          <ol>
            {history.map((_, move) => (
              <li key={move}>
                <button
                  className={`history-button ${
                    move === currentMove
                      ? 'history-current'
                      : ''
                  }`}
                  onClick={() => jumpTo(move)}
                >
                  {move === 0
                    ? 'Start of game'
                    : `Move ${move}`}
                  {move === currentMove
                    ? ' · Current'
                    : ''}
                </button>
              </li>
            ))}
          </ol>
        </div>

      </section>

      <footer>Built with React</footer>
    </main>
  );
}
