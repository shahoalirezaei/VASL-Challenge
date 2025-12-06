// src/components/ThemeToggle.tsx
import { useEffect, useState } from "react";
import { Sun, Moon } from "phosphor-react";
import { initTheme, applyTheme } from "../../utils/theme"

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const initial = initTheme();
    setTheme(initial as "light" | "dark");
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <button
      onClick={toggle}
      className="
        px-3 py-3 rounded-lg bg-white/50 dark:bg-zinc-700/60"
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
