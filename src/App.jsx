import { useState } from "react";
import Board from "./components/Board";
import MoveHistory from "./components/MoveHistory";

export default function App() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), location: { row: null, col: null } },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [moveOrderAsc, setMoveOrderAsc] = useState(true);

  const currentSquares = history[currentMove].squares;
  const { winner, line } = calculateWinner(currentSquares);

  function handlePlay(nextSquares, index) {
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;

    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, location: { row, col } },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function handleSquareClick(i) {
    if (winner || currentSquares[i]) return;

    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    handlePlay(nextSquares, i);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const status = winner
    ? `Winner: ${winner}`
    : history.length === 10
    ? "Draw! No one wins."
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 tracking-tight">
        Tic Tac Toe
      </h1>

      <div className="flex flex-col md:flex-row gap-10 bg-white shadow-2xl rounded-3xl p-8">
        {/* Bàn cờ */}
        <div className="flex flex-col items-center">
          <Board
            squares={currentSquares}
            onSquareClick={handleSquareClick}
            winningLine={line}
          />
          <div className="mt-4 text-lg font-medium text-gray-700">{status}</div>
        </div>

        {/* Lịch sử lượt đi */}
        <div className="flex flex-col justify-between border-l border-gray-300 pl-8">
          <MoveHistory
            history={history}
            currentMove={currentMove}
            onJumpTo={jumpTo}
            moveOrderAsc={moveOrderAsc}
            onToggleOrder={() => setMoveOrderAsc(!moveOrderAsc)}
          />
        </div>
      </div>
    </div>
  );
}

// 🧠 Hàm kiểm tra thắng cuộc
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }

  return { winner: null, line: null };
}
