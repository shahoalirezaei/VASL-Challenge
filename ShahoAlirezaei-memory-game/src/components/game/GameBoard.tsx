import React from "react";
import { useGameStore } from "../../store/gameStore";
import Card from "./Card";

const GameBoard: React.FC = () => {
  const { cards, gridSize } = useGameStore();

  return (
    <div
      className="
        grid 
        gap-3
        w-full max-w-[1000px]
        backdrop-blur-xl 
        bg-white/20 dark:bg-zinc-800/20
        rounded-2xl 
        p-4 sm:p-6
        border border-white/20 dark:border-zinc-700/40
        shadow-sm
      "
      style={{
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
      }}
    >
      {cards.map(card => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default GameBoard;
