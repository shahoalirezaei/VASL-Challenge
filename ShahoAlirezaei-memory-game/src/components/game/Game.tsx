// components/game/Game.tsx
import { useEffect } from "react";
import { useGameStore } from "../../store/gameStore";
import { generateCards } from "../../utils/generateCards";
import Header from "./Header";
import GameBoard from "./GameBoard";
import GameEndModal from "./GameEndModal"; // render inside Game

export default function Game() {
  const { gameStarted, gridSize, cardTheme, setCards, resetTimer } = useGameStore();

  useEffect(() => {
    resetTimer();
    const newCards = generateCards(gridSize, cardTheme);
    setCards(newCards);
}, [gridSize, cardTheme, setCards, resetTimer]);


  return (
    <div className="min-h-screen w-full flex justify-center pt-4 px-5 md:pt-10 md:px-12">
      <GameEndModal />
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-6 md:gap-10">
        <div className="md:w-1/3"><Header /></div>
        <div className="flex-1 flex justify-center items-start w-full"><GameBoard /></div>
      </div>
    </div>
  );
}
