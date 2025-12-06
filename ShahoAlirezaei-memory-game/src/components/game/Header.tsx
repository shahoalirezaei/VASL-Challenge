// src/components/game/Header.tsx
import { motion } from "framer-motion";
import { useGameStore } from "../../store/gameStore";
import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
  const { moves, matches, time } = useGameStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        w-full backdrop-blur-xl bg-white/30 dark:bg-zinc-800/30 
        rounded-2xl shadow-sm border border-white/20 dark:border-zinc-700/40
        p-4 flex items-center justify-between gap-4 flex-wrap 
      "
    >
      <div className=" flex items-center gap-6 text-sm sm:text-base font-medium flex-wrap">
        <span className="px-3 py-1 rounded-lg bg-white/50 dark:bg-zinc-700/60">
          Time: {time}s
        </span>

        <span className="px-3 py-1 rounded-lg bg-white/50 dark:bg-zinc-700/60">
          Moves: {moves}
        </span>

        <span className="px-3 py-1 rounded-lg bg-white/50 dark:bg-zinc-700/60">
          Matches: {matches}
        </span>
      </div>

      <ThemeToggle />
    </motion.div>
  );
}
