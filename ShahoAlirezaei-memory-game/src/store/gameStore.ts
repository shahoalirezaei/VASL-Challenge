import { create } from "zustand";
import type { Card } from "../types/card";
import { shuffle } from "../utils/shuffle";

interface GameState {
  cards: Card[];
  firstCard: Card | null;
  secondCard: Card | null;
  moves: number;
  gameEnded: boolean;

  // actions
  setCards: (cards: Card[]) => void;
  flipCard: (cardId: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  cards: [],
  firstCard: null,
  secondCard: null,
  moves: 0,
  gameEnded: false,

  setCards: (cards) => set({ cards: shuffle(cards), firstCard: null, secondCard: null, moves: 0, gameEnded: false }),

  flipCard: (cardId) => {
    const { cards, firstCard, secondCard, moves } = get();
    const cardIndex = cards.findIndex(c => c.id === cardId);
    if (cardIndex === -1) return;

    const card = cards[cardIndex];
    if (card.isFlipped || card.isMatched) return; // نمی‌خوایم کارت دوباره flip شه

    const updatedCards = [...cards];
    updatedCards[cardIndex] = { ...card, isFlipped: true };

    if (!firstCard) {
      set({ cards: updatedCards, firstCard: updatedCards[cardIndex] });
    } else if (!secondCard) {
      set({ cards: updatedCards, secondCard: updatedCards[cardIndex], moves: moves + 1 });

      // بررسی match بعد از 500ms
      setTimeout(() => {
        const { firstCard, secondCard, cards } = get();
        if (!firstCard || !secondCard) return;

        let newCards = [...cards];
        if (firstCard.icon === secondCard.icon) {
          // کارت‌ها matched شدن
          newCards = newCards.map(c =>
            c.id === firstCard.id || c.id === secondCard.id ? { ...c, isMatched: true } : c
          );
        } else {
          // کارت‌ها برمی‌گردن
          newCards = newCards.map(c =>
            c.id === firstCard.id || c.id === secondCard.id ? { ...c, isFlipped: false } : c
          );
        }

        const gameEnded = newCards.every(c => c.isMatched);

        set({ cards: newCards, firstCard: null, secondCard: null, gameEnded });
      }, 500);
    }
  },

  resetGame: () => set({ cards: [], firstCard: null, secondCard: null, moves: 0, gameEnded: false }),
}));
