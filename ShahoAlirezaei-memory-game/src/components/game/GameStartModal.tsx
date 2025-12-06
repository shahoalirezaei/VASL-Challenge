import { useGameStore } from "../../store/gameStore";

export default function GameStartModal() {
  const {
    gameStarted,
    startGame,
    cardTheme,
    setCardTheme,
    gridSize,
    setGridSize,
    resetTimer,
  } = useGameStore();

  if (gameStarted) return null;

   const handleStart = () => {
    // optional: ensure timer cleared
    resetTimer();
    // only toggle start; Game will generate cards
    startGame();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="w-[90%] max-w-md p-6 rounded-2xl shadow-2xl border border-white/10 bg-white/10 backdrop-blur-2xl">
        
        <h2 className="text-center text-2xl font-bold text-white mb-4">
          شروع بازی حافظه
        </h2>

        {/* Theme */}
        <div className="mb-6">
          <label className="text-white text-sm">تم کارت‌ها</label>
          <select
            value={cardTheme}
            onChange={(e) => setCardTheme(e.target.value as any)}
            className="w-full mt-1 bg-white/10 text-white p-2 rounded-lg border border-white/20 outline-none"
          >
            <option value="emoji">Emoji</option>
            <option value="icons">Icons</option>
            <option value="patterns">Patterns</option>
          </select>
        </div>

        {/* Grid */}
        <div className="mb-6">
          <label className="text-white text-sm">اندازه گرید</label>
          <select
            value={gridSize}
            onChange={(e) => setGridSize(Number(e.target.value))}
            className="w-full mt-1 bg-white/10 text-white p-2 rounded-lg border border-white/20 outline-none"
          >
            <option value={4}>4 × 4</option>
            <option value={8}>6 × 6</option>
            <option value={16}>8 × 8</option>
          </select>
        </div>

        <button
          onClick={handleStart}
          className="w-full mt-2 py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-[#0ff] to-[#0f8] shadow-[0_0_20px_#0ff]"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
