import Square from "./Square";
import { motion, AnimatePresence } from "framer-motion";

export default function Board({ squares, onSquareClick, winningLine }) {
  function renderSquare(i) {
    const isWinningSquare = winningLine?.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onSquareClick(i)}
        isWinning={isWinningSquare}
      />
    );
  }

  const lineInfo = getWinningLineStyle(winningLine);

  return (
    <div className="relative">
      {/* Bảng 3x3 */}
      <div className="grid grid-cols-3 gap-2 bg-gray-200 p-2 rounded-2xl shadow-xl">
        {Array.from({ length: 9 }, (_, i) => renderSquare(i))}
      </div>

      {/* Hiệu ứng đường nối thắng */}
      <AnimatePresence>
        {winningLine && (
          <motion.div
            key="win-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{
                duration: 0.8,
                ease: "easeInOut",
            }}
            className={`absolute 
                bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 
                bg-[length:200%_200%] animate-shine 
                shadow-[0_0_20px_#34d399] 
                rounded-full origin-left ${lineInfo}`}
            />

        )}
      </AnimatePresence>
    </div>
  );
}

// 🧠 Tính vị trí & hướng của đường thắng
function getWinningLineStyle(line) {
  if (!line) return "";
  const base = "absolute transition-all duration-500";
  const positions = {
    // ngang
    "0,1,2": "top-[16.5%] left-0 w-full h-[6px]",
    "3,4,5": "top-[49%] left-0 w-full h-[6px]",
    "6,7,8": "top-[81%] left-0 w-full h-[6px]",

    // dọc
    "0,3,6": "left-[16.5%] top-0 h-full w-[6px]",
    "1,4,7": "left-[49%] top-0 h-full w-[6px]",
    "2,5,8": "left-[81.5%] top-0 h-full w-[6px]",

    // chéo
    "0,4,8": "top-[16%] left-[16.5%] w-[95%] h-[6px] rotate-45 origin-left",
    "2,4,6": "top-[83%] left-[17%] w-[95%] h-[6px] -rotate-45 origin-left",
    };

  return `${base} ${positions[line.join(",")] || ""}`;
}
