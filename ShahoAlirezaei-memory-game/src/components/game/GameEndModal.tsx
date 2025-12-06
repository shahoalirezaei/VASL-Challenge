import { useGameStore } from "../../store/gameStore";

export default function GameEndModal() {
  const {
    gameEnded,
    moves,
    time,
    resetGameStore,
    cardTheme,
    setCardTheme,
    gridSize,
    startGame,
resetTimer,
    setGridSize,
  } = useGameStore();

  if (!gameEnded) return null;

  const handleRestart = () => {
    resetGameStore();
    startGame();
// resetTimer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="glass-modal w-[90%] max-w-md p-6 rounded-2xl shadow-2xl border border-white/10 bg-white/10 backdrop-blur-2xl">
        
        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-white mb-3 drop-shadow-lg">
          Congratulations! You won 🎉
        </h2>

        {/* Stats */}
        <div className="text-white text-center mb-6">
          <p className="text-lg">Moves: <span className="font-bold">{moves}</span></p>
          <p className="text-lg mt-1">Time: <span className="font-bold">{time} sec</span></p>
        </div>

        {/* Theme Selection */}
        <div className="mb-4">
          <label className="text-white text-sm">Card Theme</label>
          <select
            value={cardTheme}
            onChange={(e) => setCardTheme(e.target.value as any)}
            className="w-full mt-1 bg-white/10 text-white p-2 rounded-lg border border-white/20 backdrop-blur-md outline-none"
          >
            <option value="emoji">Emoji</option>
            <option value="icons">Icons</option>
            <option value="patterns">Patterns</option>
          </select>
        </div>

        {/* Grid Selection */}
        <div className="mb-4">
          <label className="text-white text-sm">Grid Size</label>
          <select
            value={gridSize}
            onChange={(e) => setGridSize(Number(e.target.value))}
            className="w-full mt-1 bg-white/10 text-white p-2 rounded-lg border border-white/20 backdrop-blur-md outline-none"
          >
            <option value={4}>4 × 4</option>
            <option value={6}>6 × 6</option>
            <option value={8}>8 × 8</option>
          </select>
        </div>

        {/* Restart Button */}
        <button
          onClick={handleRestart}
          className="w-full mt-2 py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-[#00f7ff] to-[#7a5cff] shadow-[0_0_20px_#00f7ff]/40"
        >
          Restart Game
        </button>
      </div>
    </div>
  );
}
