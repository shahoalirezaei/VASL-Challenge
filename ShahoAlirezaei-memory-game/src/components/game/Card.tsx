import React from "react";
import type { Card as CardType } from "../../types/card";
import { useGameStore } from "../../store/gameStore";

interface Props {
  card: CardType;
}

const Card: React.FC<Props> = ({ card }) => {
  const { flipCard } = useGameStore();

  const handleClick = () => {
    flipCard(card.id);
  };

  return (
    <div
      onClick={handleClick}
      className={`aspect-square flex items-center justify-center border rounded-lg cursor-pointer
        ${card.isFlipped || card.isMatched ? "bg-white" : "bg-gray-800"}
      `}
    >
      {card.isFlipped || card.isMatched ? (
        <card.icon size={32} />
      ) : null}
    </div>
  );
};

export default Card;
