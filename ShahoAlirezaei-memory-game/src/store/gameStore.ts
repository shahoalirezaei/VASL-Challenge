import { create } from "zustand";
import type { Card } from "../types/card";
import { shuffle } from "../utils/shuffle";

interface GameState {
  cards: Card[];
  firstCard: Card | null;
  secondCard: Card | null;
  moves: number;
  matches: number;
  totalPairs: number;
  gameEnded: boolean;

  time: number;
  isTimerRunning: boolean;
  timerInterval: number | null;

  theme: "light" | "dark";
  toggleTheme: () => void;

  setCards: (cards: Card[]) => void;
  flipCard: (cardId: number) => void;

  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;

  resetGameStore: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  cards: [],
  firstCard: null,
  secondCard: null,
  moves: 0,
  matches: 0,
  totalPairs: 0,
  gameEnded: false,

  time: 0,
  isTimerRunning: false,
  timerInterval: null,

  theme: "light",

  toggleTheme: () => {
    const next = get().theme === "light" ? "dark" : "light";
    set({ theme: next });
    document.documentElement.classList.toggle("dark", next === "dark");
  },

  // ---------------------------------------------------------
  // TIMER
  // ---------------------------------------------------------

  startTimer: () => {
    const { timerInterval } = get();
    if (timerInterval) return; // جلوگیری از چند برابر شدن تایمر

    const interval = window.setInterval(() => {
      set(state => ({ time: state.time + 1 }));
    }, 1000);

    set({ timerInterval: interval, isTimerRunning: true });
  },

  stopTimer: () => {
    const { timerInterval } = get();
    if (!timerInterval) return;

    clearInterval(timerInterval);
    set({ timerInterval: null, isTimerRunning: false });
  },

  resetTimer: () => {
    const { stopTimer } = get();
    stopTimer();
    set({ time: 0 });
  },

  // ---------------------------------------------------------
  // SET CARDS (شروع بازی جدید)
  // ---------------------------------------------------------

  setCards: (cards) =>
    set({
      cards: shuffle(cards),
      totalPairs: cards.length / 2,
      firstCard: null,
      secondCard: null,
      moves: 0,
      matches: 0,
      gameEnded: false,
      time: 0,
      isTimerRunning: false,
      timerInterval: null
    }),

  // ---------------------------------------------------------
  // FLIP CARD
  // ---------------------------------------------------------

  flipCard: (cardId) => {
    const {
      cards,
      firstCard,
      secondCard,
      moves,
      matches,
      totalPairs,
      startTimer,
      stopTimer
    } = get();

    // شروع تایمر در اولین حرکت واقعی
    if (moves === 0 && !firstCard && !secondCard) {
      startTimer();
    }

    const index = cards.findIndex(c => c.id === cardId);
    if (index === -1) return;

    const card = cards[index];
    if (card.isFlipped || card.isMatched) return;

    const updated = [...cards];
    updated[index] = { ...card, isFlipped: true };

    if (!firstCard) {
      set({ cards: updated, firstCard: updated[index] });
      return;
    }

    if (!secondCard) {
      set({
        cards: updated,
        secondCard: updated[index],
        moves: moves + 1,
      });

      setTimeout(() => {
        const { firstCard, secondCard, cards } = get();
        if (!firstCard || !secondCard) return;

        let newCards = [...cards];
        let newMatches = matches;

        if (firstCard.icon === secondCard.icon) {
          // Match
          newCards = newCards.map(c =>
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, isMatched: true }
              : c
          );
          newMatches++;
        } else {
          // No match
          newCards = newCards.map(c =>
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, isFlipped: false }
              : c
          );
        }

        const finished = newMatches === totalPairs;
        if (finished) stopTimer();

        set({
          cards: newCards,
          firstCard: null,
          secondCard: null,
          matches: newMatches,
          gameEnded: finished
        });
      }, 500);
    }
  },

  // ---------------------------------------------------------
  // RESET ALL (برای بازی جدید)
  // ---------------------------------------------------------

  resetGameStore: () => {
    const { stopTimer } = get();
    stopTimer();

    set({
      cards: [],
      firstCard: null,
      secondCard: null,
      moves: 0,
      matches: 0,
      totalPairs: 0,
      gameEnded: false,
      time: 0,
      isTimerRunning: false,
      timerInterval: null
    });
  }
}));
