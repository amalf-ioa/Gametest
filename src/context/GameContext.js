import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import StorageService from '../services/StorageService';
import { MAX_LIVES, LIFE_REGEN_TIME } from '../data/constants';

// ─── Initial state ─────────────────────────────────────────────────────────────

const initialState = {
  // Progress
  currentLevel: 1,
  highestLevelUnlocked: 1,
  totalStarsEarned: 0,
  levelStars: {},       // { [levelId]: 0-3 }

  // Lives
  livesRemaining: MAX_LIVES,
  lastLifeTime: Date.now(),

  // Renovation
  renovationProgress: {
    entryGarden: { tasksComplete: [], selectedOptions: {}, currentTask: 0 },
    petParlor:   { tasksComplete: [], selectedOptions: {}, currentTask: 0 },
  },

  // Inventory
  inventory: { rockets: 0, bombs: 0, rainbows: 0 },

  // Settings
  settings: {
    musicVolume: 0.7,
    sfxVolume: 0.8,
    vibrationEnabled: true,
    musicEnabled: true,
    sfxEnabled: true,
  },

  // Loaded flag
  isLoaded: false,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

function gameReducer(state, action) {
  switch (action.type) {

    case 'LOAD_STATE':
      return { ...state, ...action.payload, isLoaded: true };

    case 'COMPLETE_LEVEL': {
      const { levelId, stars, score } = action.payload;
      const prevStars = state.levelStars[levelId] || 0;
      const newStars = Math.max(prevStars, stars);
      const starDiff = newStars - prevStars;
      return {
        ...state,
        levelStars: { ...state.levelStars, [levelId]: newStars },
        highestLevelUnlocked: Math.max(state.highestLevelUnlocked, levelId + 1),
        totalStarsEarned: state.totalStarsEarned + starDiff,
      };
    }

    case 'FAIL_LEVEL': {
      const newLives = Math.max(0, state.livesRemaining - 1);
      return {
        ...state,
        livesRemaining: newLives,
        lastLifeTime: newLives < MAX_LIVES ? Date.now() : state.lastLifeTime,
      };
    }

    case 'REGENERATE_LIVES': {
      if (state.livesRemaining >= MAX_LIVES) return state;
      const timePassed = Date.now() - state.lastLifeTime;
      const recovered = Math.floor(timePassed / LIFE_REGEN_TIME);
      if (recovered === 0) return state;
      const newLives = Math.min(MAX_LIVES, state.livesRemaining + recovered);
      return {
        ...state,
        livesRemaining: newLives,
        lastLifeTime: newLives >= MAX_LIVES ? state.lastLifeTime : state.lastLifeTime + recovered * LIFE_REGEN_TIME,
      };
    }

    case 'ADD_LIVES':
      return { ...state, livesRemaining: Math.min(MAX_LIVES, state.livesRemaining + action.payload) };

    case 'SET_UNLIMITED_LIVES':
      return { ...state, livesRemaining: MAX_LIVES, lastLifeTime: Date.now() + action.payload };

    case 'EARN_STARS':
      return { ...state, totalStarsEarned: state.totalStarsEarned + action.payload };

    case 'SPEND_STARS':
      return { ...state, totalStarsEarned: Math.max(0, state.totalStarsEarned - action.payload) };

    case 'ADD_BOOSTER': {
      const { boosterType, amount } = action.payload;
      return {
        ...state,
        inventory: { ...state.inventory, [boosterType]: (state.inventory[boosterType] || 0) + amount },
      };
    }

    case 'USE_BOOSTER': {
      const { boosterType } = action.payload;
      return {
        ...state,
        inventory: { ...state.inventory, [boosterType]: Math.max(0, (state.inventory[boosterType] || 0) - 1) },
      };
    }

    case 'COMPLETE_RENOVATION_TASK': {
      const { areaId, taskId, optionId } = action.payload;
      const area = state.renovationProgress[areaId] || { tasksComplete: [], selectedOptions: {}, currentTask: 0 };
      return {
        ...state,
        renovationProgress: {
          ...state.renovationProgress,
          [areaId]: {
            ...area,
            tasksComplete: [...area.tasksComplete, taskId],
            selectedOptions: { ...area.selectedOptions, [taskId]: optionId },
            currentTask: area.currentTask + 1,
          },
        },
      };
    }

    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };

    case 'RESET':
      return { ...initialState, isLoaded: true };

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load saved state on mount
  useEffect(() => {
    StorageService.loadGameState().then(saved => {
      if (saved) {
        dispatch({ type: 'LOAD_STATE', payload: saved });
      } else {
        dispatch({ type: 'LOAD_STATE', payload: {} });
      }
    });
  }, []);

  // Save on every state change (after loaded)
  useEffect(() => {
    if (state.isLoaded) {
      const { isLoaded, ...toSave } = state;
      StorageService.saveGameState(toSave);
    }
  }, [state]);

  // Life regeneration timer
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'REGENERATE_LIVES' });
    }, 15000); // Check every 15 s
    return () => clearInterval(interval);
  }, []);

  const completeLevel = useCallback((levelId, stars, score) => {
    dispatch({ type: 'COMPLETE_LEVEL', payload: { levelId, stars, score } });
    StorageService.saveLevelProgress(levelId, stars, score);
  }, [dispatch]);

  const failLevel = useCallback(() => {
    dispatch({ type: 'FAIL_LEVEL' });
  }, [dispatch]);

  const spendStars = useCallback((amount) => {
    if (state.totalStarsEarned >= amount) {
      dispatch({ type: 'SPEND_STARS', payload: amount });
      return true;
    }
    return false;
  }, [state.totalStarsEarned, dispatch]);

  return (
    <GameContext.Provider value={{ state, dispatch, completeLevel, failLevel, spendStars }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}

export default GameContext;
