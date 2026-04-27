import { useState, useEffect, useCallback } from 'react';
import { GameState, Word, INITIAL_WORD_POOL, Difficulty } from '../constants';

const STORAGE_KEY = 'word-sniper-state';

const initialState: GameState = {
  players: [],
  scores: {},
  recentWordHistory: [],
  wordHistory: [],
  currentWords: [],
  round: 0,
  maxRounds: 10,
  timerSetting: 30,
  difficulty: 'normal',
  showRuby: false,
  gameStatus: 'setup',
  isDarkMode: false,
};

export const useGameState = () => {
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    document.documentElement.setAttribute('data-theme', state.isDarkMode ? 'dark' : 'light');
  }, [state]);

  const toggleDarkMode = () => {
    setState(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }));
  };

  const addPlayer = (name: string) => {
    if (!name || state.players.includes(name)) return;
    setState(prev => ({
      ...prev,
      players: [...prev.players, name],
      scores: { ...prev.scores, [name]: 0 }
    }));
  };

  const removePlayer = (name: string) => {
    setState(prev => {
      const { [name]: _, ...remainingScores } = prev.scores;
      return {
        ...prev,
        players: prev.players.filter(p => p !== name),
        scores: remainingScores
      };
    });
  };

  const updateSettings = (maxRounds: number, timerSetting: number, difficulty: Difficulty = state.difficulty, showRuby: boolean = state.showRuby) => {
    setState(prev => ({ ...prev, maxRounds, timerSetting, difficulty, showRuby }));
  };

  const getRandomWords = useCallback((history: string[], difficulty: Difficulty): Word[] => {
    const availableWords = INITIAL_WORD_POOL.filter(w => !history.includes(w.id));
    
    if (availableWords.length < 3) {
      return getRandomWords([], difficulty);
    }

    if (difficulty === 'hard') {
      // Hard: Completely random 3 words
      const shuffled = [...availableWords].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 3);
    }

    if (difficulty === 'easy') {
      // Easy: 2 words from same category + 1 from another
      const categories = Array.from(new Set(availableWords.map(w => w.category)));
      const shuffledCats = [...categories].sort(() => Math.random() - 0.5);
      
      for (const cat of shuffledCats) {
        const catWords = availableWords.filter(w => w.category === cat);
        if (catWords.length >= 2) {
          const shuffledCatWords = [...catWords].sort(() => Math.random() - 0.5);
          const word1 = shuffledCatWords[0];
          const word2 = shuffledCatWords[1];
          
          const remaining = availableWords.filter(w => w.id !== word1.id && w.id !== word2.id);
          const word3 = remaining[Math.floor(Math.random() * remaining.length)];
          
          return [word1, word2, word3];
        }
      }
      // Fallback to normal if no category has 2 words
      return getRandomWords(history, 'normal');
    }

    // Normal: Mixed categories (1 from cat1, 1 from cat2, 1 from pool)
    const categories = Array.from(new Set(availableWords.map(w => w.category)));
    const shuffledCats = [...categories].sort(() => Math.random() - 0.5);
    const cat1 = shuffledCats[0];
    const cat2 = shuffledCats[1];

    const wordsFromCat1 = availableWords.filter(w => w.category === cat1);
    const wordsFromCat2 = availableWords.filter(w => w.category === cat2);

    const word1 = wordsFromCat1[Math.floor(Math.random() * wordsFromCat1.length)];
    const remainingAfter1 = availableWords.filter(w => w.id !== word1.id);
    
    const wordsFromCat2Filtered = wordsFromCat2.filter(w => w.id !== word1.id);
    const word2 = wordsFromCat2Filtered.length > 0
      ? wordsFromCat2Filtered[Math.floor(Math.random() * wordsFromCat2Filtered.length)]
      : remainingAfter1[Math.floor(Math.random() * remainingAfter1.length)];

    const remainingAfter2 = remainingAfter1.filter(w => w.id !== word2.id);
    const word3 = remainingAfter2[Math.floor(Math.random() * remainingAfter2.length)];

    return [word1, word2, word3];
  }, []);

  const startGame = () => {
    if (state.players.length === 0) return;
    
    const initialWords = getRandomWords([], state.difficulty);
    setState(prev => ({
      ...prev,
      gameStatus: 'playing',
      round: 1,
      currentWords: initialWords,
      wordHistory: [initialWords],
      recentWordHistory: initialWords.map(w => w.id),
      scores: prev.players.reduce((acc, p) => ({ ...acc, [p]: 0 }), {})
    }));
  };

  const nextRound = () => {
    if (state.round >= state.maxRounds) {
      setState(prev => ({ ...prev, gameStatus: 'finished' }));
      return;
    }

    const newWords = getRandomWords(state.recentWordHistory, state.difficulty);
    setState(prev => {
      let newHistory = [...prev.recentWordHistory, ...newWords.map(w => w.id)];
      if (newHistory.length > 15) {
        newHistory = newHistory.slice(newHistory.length - 15);
      }

      return {
        ...prev,
        round: prev.round + 1,
        currentWords: newWords,
        wordHistory: [...prev.wordHistory, newWords],
        recentWordHistory: newHistory
      };
    });
  };

  const prevRound = () => {
    setState(prev => {
      if (prev.gameStatus === 'finished') {
        return {
          ...prev,
          gameStatus: 'playing',
          round: prev.maxRounds,
          currentWords: prev.wordHistory[prev.maxRounds - 1]
        };
      }

      if (prev.round <= 1) {
        return {
          ...prev,
          gameStatus: 'setup',
          round: 0,
          currentWords: [],
          wordHistory: []
        };
      }

      const newRound = prev.round - 1;
      return {
        ...prev,
        round: newRound,
        currentWords: prev.wordHistory[newRound - 1]
      };
    });
  };

  const addScore = (playerName: string) => {
    setState(prev => ({
      ...prev,
      scores: {
        ...prev.scores,
        [playerName]: (prev.scores[playerName] || 0) + 1
      }
    }));
  };

  const resetGame = () => {
    setState(prev => ({
      ...prev,
      gameStatus: 'setup',
      round: 0,
      currentWords: [],
      wordHistory: [],
      recentWordHistory: []
    }));
  };

  return {
    state,
    addPlayer,
    removePlayer,
    updateSettings,
    startGame,
    nextRound,
    prevRound,
    addScore,
    resetGame,
    toggleDarkMode
  };
};
