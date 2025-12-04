import { iconsList } from "../assets/icons";
import type { Card } from "../types/card";
import { shuffle } from "./shuffle";

let nextId = 1; // unique ID for each card

/**
 * Generate cards based on grid size
 * @param gridSize number of rows/columns (e.g., 4, 8, 16)
 * @returns array of cards with paired icons, ready to use
 */
export const generateCards = (gridSize: number): Card[] => {
  const totalCards = gridSize * gridSize;
  const neededIcons = totalCards / 2;

  // Select the required number of icons
  const selectedIcons: typeof iconsList = [];
  let iconIndex = 0;

  while (selectedIcons.length < neededIcons) {
    selectedIcons.push(iconsList[iconIndex % iconsList.length]);
    iconIndex++;
  }

  // Create pairs of cards
  const cards: Card[] = [];
  selectedIcons.forEach((IconComponent) => {
    cards.push(
      { id: nextId++, icon: IconComponent, isFlipped: false, isMatched: false },
      { id: nextId++, icon: IconComponent, isFlipped: false, isMatched: false }
    );
  });

  // Use shared shuffle function
  return shuffle(cards);
};
