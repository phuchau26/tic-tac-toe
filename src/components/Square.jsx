export default function Square({ value, onClick, isWinning }) {
  const base =
    "w-20 h-20 flex items-center justify-center text-3xl font-extrabold rounded-xl cursor-pointer transition-all duration-200";

  const normal =
    "bg-white hover:bg-gray-100 shadow-md active:scale-95 text-gray-700";
  const winning =
    "bg-cyan-100 text-cyan-700 shadow-[0_0_25px_#22d3ee] animate-pulse scale-105";

  return (
    <button
      onClick={onClick}
      className={`${base} ${isWinning ? winning : normal}`}
    >
      {value}
    </button>
  );
}
