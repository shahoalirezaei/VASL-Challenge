import { useEffect } from "react";
import { useGameStore } from "../../store/gameStore";
import { generateCards } from "../../utils/generateCards";
import Header from "./Header";
import GameBoard from "./GameBoard";

interface GameProps {
  gridSize: number;
}

export default function Game({ gridSize }: GameProps) {
  const { setCards, resetTimer } = useGameStore();

  useEffect(() => {
    resetTimer();
    const newCards = generateCards(gridSize);
    setCards(newCards);
  }, [gridSize, setCards, resetTimer]);

  return (
    <div
      className="
        min-h-screen w-full
        flex justify-center
        bg-neutral-100 dark:bg-neutral-900
        bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.05),transparent)]
        dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent)]
        text-neutral-900 dark:text-neutral-100
        pt-4 px-5 md:pt-10 md:px-12 
      "
    >
      <div
        className="
          w-full max-w-7xl 
          flex flex-col md:flex-row 
          gap-6 md:gap-10
        "
      >
        {/* هدر: بالا در موبایل، چپ در دسکتاپ */}
        <div className="md:w-1/3">
          <Header />
        </div>

        {/* برد: پایین در موبایل، راست در دسکتاپ */}
        <div className="flex-1 flex justify-center items-start w-full">
          <GameBoard gridSize={gridSize} />
        </div>
      </div>
    </div>
  );
}
