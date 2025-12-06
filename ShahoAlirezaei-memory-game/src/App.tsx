import React from "react";
import { useGameStore } from "./store/gameStore";
import Game from "./components/game/Game";
import GameStartModal from "./components/game/GameStartModal";

const App: React.FC = () => {
  // App فقط برای تصمیم نمایش StartModal یا خود Game لازم داره
  const { gameStarted } = useGameStore();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-black via-purple-900 to-indigo-900">
      <Game />
      <GameStartModal /> {/* این مدال خودش null برمی‌گردونه اگر gameStarted باشه */}
    </div>
  );
};

export default App;
