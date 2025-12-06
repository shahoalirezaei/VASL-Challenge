import React from "react";
import { motion } from "framer-motion";
import type { Card as CardType } from "../../types/card";
import { useGameStore } from "../../store/gameStore";

interface Props {
  card: CardType;
}

const Card: React.FC<Props> = ({ card }) => {
  const { flipCard } = useGameStore();

  return (
    <div className="w-full card-perspective">
      <motion.div
        onClick={() => flipCard(card.id)}
        animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
        transition={{ duration: 0.45 }}
        className={`
          relative w-full aspect-square rounded-xl cursor-pointer preserve-3d
          border border-white/20 dark:border-zinc-700/40 shadow-sm
          ${card.isFlipped || card.isMatched ? "bg-white/40 dark:bg-zinc-800/40" : "bg-white/10 dark:bg-zinc-700/20"}
        `}
      >
        {/* FRONT */}
        <div className="absolute inset-0 flex items-center justify-center backface-hidden">
          <div className="w-3/4 h-3/4 rounded-lg bg-white/10 dark:bg-white/5 border border-white/10 flex items-center justify-center">
            <div className="text-slate-400 dark:text-slate-500 text-xl font-semibold">● ●</div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 flex items-center justify-center backface-hidden rotate-y-180"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="w-3/4 h-3/4 rounded-lg bg-white/30 dark:bg-zinc-800/40 border border-white/20 dark:border-zinc-700/40 flex items-center justify-center shadow-sm">
            {(card.isFlipped || card.isMatched) && (
              <card.icon
                size={40}
                className={`${
                  card.isMatched
                    ? "text-emerald-400 drop-shadow-sm"
                    : "text-indigo-500 dark:text-indigo-300"
                }`}
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
