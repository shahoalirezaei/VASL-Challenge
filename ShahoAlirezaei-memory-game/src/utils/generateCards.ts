import { iconsList } from "../assets/icons";
// import { emojiList } from "../assets/emojis";
// import { patternList } from "../assets/patterns";

import type { Card } from "../types/card";
import { shuffle } from "./shuffle";

export const emojiList = ["🐱", "🚀", "🍕", "⚡", "❤️"];

export const patternList = [
  "pattern-1",
  "pattern-2",
  "pattern-3",
  "pattern-4",
];


let nextId = 1;

export const generateCards = (
  gridSize: number,
  theme: "icons" | "emoji" | "patterns"
): Card[] => {
  const totalCards = gridSize * gridSize;
  const neededPairs = totalCards / 2;

  // pick source list depending on theme
  let source: any[] = [];

  if (theme === "icons") source = iconsList;
  if (theme === "emoji") source = emojiList;
  if (theme === "patterns") source = patternList;

  const selected: any[] = [];
  let index = 0;

  while (selected.length < neededPairs) {
    selected.push(source[index % source.length]);
    index++;
  }

  const cards: Card[] = [];

  selected.forEach((item) => {
    cards.push(
      {
        id: nextId++,
        icon: item,
        isFlipped: false,
        isMatched: false
      },
      {
        id: nextId++,
        icon: item,
        isFlipped: false,
        isMatched: false
      }
    );
  });

  return shuffle(cards);
};
