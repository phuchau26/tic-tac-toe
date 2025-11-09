export default function MoveHistory({
  history,
  currentMove,
  onJumpTo,
  moveOrderAsc,
  onToggleOrder,
}) {
  const moves = history.map((step, move) => {
    const desc = move
      ? `Go to move #${move} (${step.location.row}, ${step.location.col})`
      : "Go to game start";

    return (
      <li key={move} className="mb-1">
        {move === currentMove ? (
          <span className="text-blue-700 font-medium">
            You are at move #{move}
          </span>
        ) : (
          <button
            onClick={() => onJumpTo(move)}
            className="text-sm text-gray-700 hover:text-blue-600 hover:underline transition-colors"
          >
            {desc}
          </button>
        )}
      </li>
    );
  });

  const orderedMoves = moveOrderAsc ? moves : [...moves].reverse();

  return (
    <div className="mt-6 text-left">
      <button
        onClick={onToggleOrder}
        className="mb-3 px-3 py-1.5 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-all"
      >
        Toggle Order ({moveOrderAsc ? "Asc" : "Desc"})
      </button>
      <ol className="pl-4 space-y-1">{orderedMoves}</ol>
    </div>
  );
}
