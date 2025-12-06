import { create } from "zustand";
import type { Card } from "../types/card";
import { shuffle } from "../utils/shuffle";

interface GameState {
  // UI theme
  uiTheme: "light" | "dark";
  toggleUITheme: () => void;

  // Card theme
  cardTheme: "emoji" | "icons" | "patterns";
  setCardTheme: (theme: "emoji" | "icons" | "patterns") => void;

  // Grid
  gridSize: number;
  setGridSize: (size: number) => void;

  // Game flow
  gameStarted: boolean;
  gameEnded: boolean;
  startGame: () => void;
  endGame: () => void;
  resetGameStore: () => void;

  // Cards
  cards: Card[];
  setCards: (cards: Card[]) => void;

  // Matching system
  firstCard: Card | null;
  secondCard: Card | null;
  moves: number;
  matches: number;
  totalPairs: number;
  flipCard: (id: number) => void;

  // Timer
  time: number;
  isTimerRunning: boolean;
  timerInterval: number | null;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // ---------------------------------------------------------
  // UI theme (dark/light)
  // ---------------------------------------------------------
  uiTheme: "light",

  toggleUITheme: () => {
    const next = get().uiTheme === "light" ? "dark" : "light";
    set({ uiTheme: next });
    document.documentElement.classList.toggle("dark", next === "dark");
  },

  // ---------------------------------------------------------
  // CARD theme selection
  // ---------------------------------------------------------
  cardTheme: "emoji",

  setCardTheme: (theme) => {
    set({ cardTheme: theme });
    get().resetGameStore();
  },

  // ---------------------------------------------------------
  // GRID
  // ---------------------------------------------------------
  gridSize: 4,

  setGridSize: (size) => {
    set({ gridSize: size });
    get().resetGameStore();
  },

  // ---------------------------------------------------------
  // GAME FLOW
  // ---------------------------------------------------------
  gameStarted: false,
  gameEnded: false,

  startGame: () => set({ gameStarted: true, gameEnded: false }),

  endGame: () => {
    set({ gameEnded: true });
    get().stopTimer();
  },

  // ---------------------------------------------------------
  // CARDS
  // ---------------------------------------------------------
  cards: [],
  firstCard: null,
  secondCard: null,
  moves: 0,
  matches: 0,
  totalPairs: 0,

  setCards: (cards) =>
    set({
      cards: shuffle(cards),
      totalPairs: cards.length / 2,
      firstCard: null,
      secondCard: null,
      moves: 0,
      matches: 0,
      gameEnded: false,
    }),

  // ---------------------------------------------------------
  // FLIP
  // ---------------------------------------------------------
  flipCard: (id) => {
    const {
      cards,
      firstCard,
      secondCard,
      moves,
      matches,
      totalPairs,
      startTimer,
      endGame
    } = get();

    if (!get().gameStarted) return;

    if (moves === 0 && !firstCard) startTimer();

    const index = cards.findIndex(c => c.id === id);
    if (index === -1) return;

    const card = cards[index];
    if (card.isFlipped || card.isMatched) return;

    const updated = [...cards];
    updated[index] = { ...card, isFlipped: true };

    // first
    if (!firstCard) {
      set({ cards: updated, firstCard: updated[index] });
      return;
    }

    // second
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
          newCards = newCards.map(c =>
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, isMatched: true }
              : c
          );
          newMatches++;
        } else {
          newCards = newCards.map(c =>
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, isFlipped: false }
              : c
          );
        }

        const finished = newMatches === totalPairs;
        if (finished) endGame();

        set({
          cards: newCards,
          firstCard: null,
          secondCard: null,
          matches: newMatches,
        });
      }, 500);
    }
  },

  // ---------------------------------------------------------
  // TIMER
  // ---------------------------------------------------------
  time: 0,
  isTimerRunning: false,
  timerInterval: null,

  startTimer: () => {
    if (get().timerInterval) return;

    const interval = window.setInterval(() => {
      set(state => ({ time: state.time + 1 }));
    }, 1000);

    set({ timerInterval: interval, isTimerRunning: true });
  },

  stopTimer: () => {
    const timer = get().timerInterval;
    if (!timer) return;

    clearInterval(timer);
    set({ timerInterval: null, isTimerRunning: false });
  },

  resetTimer: () => {
    get().stopTimer();
    set({ time: 0 });
  },

  // ---------------------------------------------------------
  // RESET
  // ---------------------------------------------------------
  resetGameStore: () => {
    get().stopTimer();

    set({
      gameStarted: false,
      gameEnded: false,
      cards: [],
      firstCard: null,
      secondCard: null,
      moves: 0,
      matches: 0,
      totalPairs: 0,
      time: 0,
      isTimerRunning: false,
      timerInterval: null,
    });
  }
}));
