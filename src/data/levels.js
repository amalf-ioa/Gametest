export const LEVELS = {
  1: {
    id: 1, area: 'entryGarden', difficulty: 'tutorial', moves: 35,
    objectives: { dogbone: 10, cattoy: 8, score: 1500 },
    obstacles: [],
    boardSize: 8,
    tileTypes: ['dogbone', 'cattoy', 'fishtreat', 'birdseed', 'heart'],
    starThresholds: { 1: 1500, 2: 2500, 3: 3500 },
    storyDialogue: { character: 'Luna', text: "Welcome to Pet Paradise! Help me fix up this garden for our furry friends!", image: 'luna_wave' },
  },
  2: {
    id: 2, area: 'entryGarden', difficulty: 'easy', moves: 30,
    objectives: { cattoy: 12, fishtreat: 10, score: 2000 },
    obstacles: [],
    boardSize: 8,
    tileTypes: ['dogbone', 'cattoy', 'fishtreat', 'birdseed', 'heart'],
    starThresholds: { 1: 2000, 2: 3000, 3: 4500 },
    storyDialogue: { character: 'Luna', text: "Great start! The pets are already happier. Keep going!", image: 'luna_happy' },
  },
  3: {
    id: 3, area: 'entryGarden', difficulty: 'easy', moves: 28,
    objectives: { dogbone: 15, birdseed: 12, score: 2500 },
    obstacles: [{ type: 'box', positions: [[3,3], [4,4]], hits: 1 }],
    boardSize: 8,
    tileTypes: ['dogbone', 'cattoy', 'fishtreat', 'birdseed', 'heart'],
    starThresholds: { 1: 2500, 2: 3500, 3: 5000 },
  },
  4: {
    id: 4, area: 'entryGarden', difficulty: 'easy', moves: 26,
    objectives: { heart: 15, fishtreat: 12, score: 3000 },
    obstacles: [{ type: 'box', positions: [[2,2], [5,5], [3,6]], hits: 1 }],
    boardSize: 8,
    tileTypes: ['dogbone', 'cattoy', 'fishtreat', 'birdseed', 'heart'],
    starThresholds: { 1: 3000, 2: 4500, 3: 6000 },
  },
  5: {
    id: 5, area: 'entryGarden', difficulty: 'easy', moves: 25,
    objectives: { dogbone: 18, cattoy: 15, score: 3500 },
    obstacles: [{ type: 'box', positions: [[1,3], [2,4], [5,3], [6,4]], hits: 1 }],
    boardSize: 8,
    tileTypes: ['dogbone', 'cattoy', 'fishtreat', 'birdseed', 'heart', 'star'],
    starThresholds: { 1: 3500, 2: 5000, 3: 7000 },
  },
  6: {
    id: 6, area: 'entryGarden', difficulty: 'medium', moves: 24,
    objectives: { fishtreat: 20, birdseed: 18, score: 4000 },
    obstacles: [{ type: 'box', positions: [[0,4], [7,3], [3,0], [4,7]], hits: 1 }],
    boardSize: 8,
    tileTypes: ['dogbone', 'cattoy', 'fishtreat', 'birdseed', 'heart', 'star'],
    starThresholds: { 1: 4000, 2: 6000, 3: 8000 },
  },
  7: {
    id: 7, area: 'entryGarden', difficulty: 'medium', moves: 22,
    objectives: { star: 15, heart: 20, score: 4500 },
    obstacles: [
      { type: 'box', positions: [[2,2], [2,5], [5,2], [5,5]], hits: 1 },
      { type: 'cage', positions: [[3,3]], hits: 2 },
    ],
    boardSize: 8,
    tileTypes: ['dogbone', 'cattoy', 'fishtreat', 'birdseed', 'heart', 'star'],
    starThresholds: { 1: 4500, 2: 6500, 3: 9000 },
  },
  8: {
    id: 8, area: 'entryGarden', difficulty: 'medium', moves: 22,
    objectives: { dogbone: 22, cattoy: 18, score: 5000 },
    obstacles: [
      { type: 'cage', positions: [[2,3], [5,4]], hits: 2 },
      { type: 'box', positions: [[0,0], [0,7], [7,0], [7,7]], hits: 1 },
    ],
    boardSize: 8,
    tileTypes: ['dogbone', 'cattoy', 'fishtreat', 'birdseed', 'heart', 'star'],
    starThresholds: { 1: 5000, 2: 7500, 3: 10000 },
  },
  9: {
    id: 9, area: 'entryGarden', difficulty: 'medium', moves: 20,
    objectives: { fishtreat: 25, birdseed: 20, star: 15, score: 6000 },
    obstacles: [
      { type: 'cage', positions: [[1,1], [6,6], [1,6], [6,1]], hits: 2 },
      { type: 'stone', positions: [[3,3], [4,4]], hits: 3 },
    ],
    boardSize: 8,
    tileTypes: ['dogbone', 'cattoy', 'fishtreat', 'birdseed', 'heart', 'star'],
    starThresholds: { 1: 6000, 2: 9000, 3: 12000 },
  },
  10: {
    id: 10, area: 'entryGarden', difficulty: 'boss', moves: 20,
    objectives: { clearBoard: true, score: 10000 },
    obstacles: [
      { type: 'stone', positions: [[0,0], [7,7]], hits: 3 },
      { type: 'cage', positions: [[3,3], [4,4]], hits: 3 },
    ],
    boardSize: 8,
    tileTypes: ['dogbone', 'cattoy', 'fishtreat', 'birdseed', 'heart', 'star'],
    starThresholds: { 1: 10000, 2: 15000, 3: 20000 },
    storyDialogue: { character: 'Luna', text: "We saved our first dog! The garden is looking beautiful!", image: 'luna_happy' },
  },
  11: {
    id: 11, area: 'petParlor', difficulty: 'easy', moves: 30,
    objectives: { cattoy: 20, heart: 15, score: 4000 },
    obstacles: [],
    boardSize: 8,
    tileTypes: ['dogbone', 'cattoy', 'fishtreat', 'birdseed', 'heart', 'star'],
    starThresholds: { 1: 4000, 2: 6000, 3: 8500 },
    storyDialogue: { character: 'Luna', text: "Welcome to the Pet Parlor! Time to make our pets look fabulous!", image: 'luna_wave' },
  },
  12: {
    id: 12, area: 'petParlor', difficulty: 'easy', moves: 28,
    objectives: { dogbone: 20, star: 18, score: 5000 },
    obstacles: [{ type: 'box', positions: [[2,1], [2,6], [5,1], [5,6]], hits: 1 }],
    boardSize: 8,
    tileTypes: ['dogbone', 'cattoy', 'fishtreat', 'birdseed', 'heart', 'star'],
    starThresholds: { 1: 5000, 2: 7500, 3: 10000 },
  },
  13: {
    id: 13, area: 'petParlor', difficulty: 'medium', moves: 26,
    objectives: { fishtreat: 22, birdseed: 20, score: 5500 },
    obstacles: [
      { type: 'box', positions: [[3,2], [3,5], [4,2], [4,5]], hits: 1 },
      { type: 'cage', positions: [[3,3], [4,4]], hits: 2 },
    ],
    boardSize: 8,
    tileTypes: ['dogbone', 'cattoy', 'fishtreat', 'birdseed', 'heart', 'star'],
    starThresholds: { 1: 5500, 2: 8000, 3: 11000 },
  },
  14: {
    id: 14, area: 'petParlor', difficulty: 'medium', moves: 25,
    objectives: { heart: 25, star: 20, score: 6500 },
    obstacles: [
      { type: 'cage', positions: [[1,2], [1,5], [6,2], [6,5]], hits: 2 },
      { type: 'stone', positions: [[0,3], [0,4]], hits: 3 },
    ],
    boardSize: 8,
    tileTypes: ['dogbone', 'cattoy', 'fishtreat', 'birdseed', 'heart', 'star'],
    starThresholds: { 1: 6500, 2: 9500, 3: 13000 },
  },
  15: {
    id: 15, area: 'petParlor', difficulty: 'medium', moves: 23,
    objectives: { dogbone: 25, cattoy: 22, fishtreat: 20, score: 7500 },
    obstacles: [
      { type: 'stone', positions: [[3,3], [3,4], [4,3], [4,4]], hits: 2 },
      { type: 'box', positions: [[0,0], [0,7], [7,0], [7,7]], hits: 1 },
    ],
    boardSize: 8,
    tileTypes: ['dogbone', 'cattoy', 'fishtreat', 'birdseed', 'heart', 'star'],
    starThresholds: { 1: 7500, 2: 11000, 3: 15000 },
  },
  16: {
    id: 16, area: 'petParlor', difficulty: 'hard', moves: 22,
    objectives: { birdseed: 28, heart: 25, score: 8000 },
    obstacles: [
      { type: 'cage', positions: [[1,1], [1,3], [1,5], [6,1], [6,3], [6,5]], hits: 2 },
      { type: 'stone', positions: [[3,0], [4,7]], hits: 3 },
    ],
    boardSize: 8,
    tileTypes: ['dogbone', 'cattoy', 'fishtreat', 'birdseed', 'heart', 'star'],
    starThresholds: { 1: 8000, 2: 12000, 3: 16000 },
  },
  17: {
    id: 17, area: 'petParlor', difficulty: 'hard', moves: 21,
    objectives: { star: 30, cattoy: 25, score: 9000 },
    obstacles: [
      { type: 'stone', positions: [[2,2], [2,5], [5,2], [5,5]], hits: 3 },
      { type: 'cage', positions: [[0,3], [0,4], [7,3], [7,4]], hits: 2 },
      { type: 'box', positions: [[3,0], [4,0], [3,7], [4,7]], hits: 1 },
    ],
    boardSize: 8,
    tileTypes: ['dogbone', 'cattoy', 'fishtreat', 'birdseed', 'heart', 'star'],
    starThresholds: { 1: 9000, 2: 13000, 3: 18000 },
  },
  18: {
    id: 18, area: 'petParlor', difficulty: 'hard', moves: 20,
    objectives: { dogbone: 30, fishtreat: 28, heart: 25, score: 10000 },
    obstacles: [
      { type: 'stone', positions: [[1,3], [1,4], [6,3], [6,4]], hits: 3 },
      { type: 'cage', positions: [[3,1], [3,6], [4,1], [4,6]], hits: 3 },
    ],
    boardSize: 8,
    tileTypes: ['dogbone', 'cattoy', 'fishtreat', 'birdseed', 'heart', 'star'],
    starThresholds: { 1: 10000, 2: 15000, 3: 20000 },
  },
  19: {
    id: 19, area: 'petParlor', difficulty: 'hard', moves: 20,
    objectives: { birdseed: 30, star: 28, cattoy: 25, score: 12000 },
    obstacles: [
      { type: 'stone', positions: [[0,0], [0,7], [7,0], [7,7]], hits: 3 },
      { type: 'cage', positions: [[2,2], [2,5], [5,2], [5,5]], hits: 3 },
      { type: 'box', positions: [[3,3], [3,4], [4,3], [4,4]], hits: 2 },
    ],
    boardSize: 8,
    tileTypes: ['dogbone', 'cattoy', 'fishtreat', 'birdseed', 'heart', 'star'],
    starThresholds: { 1: 12000, 2: 18000, 3: 24000 },
  },
  20: {
    id: 20, area: 'petParlor', difficulty: 'boss', moves: 18,
    objectives: { clearBoard: true, score: 15000 },
    obstacles: [
      { type: 'stone', positions: [[0,3], [0,4], [7,3], [7,4]], hits: 3 },
      { type: 'cage', positions: [[3,0], [4,0], [3,7], [4,7]], hits: 3 },
      { type: 'box', positions: [[2,2], [5,5], [2,5], [5,2]], hits: 2 },
    ],
    boardSize: 8,
    tileTypes: ['dogbone', 'cattoy', 'fishtreat', 'birdseed', 'heart', 'star'],
    starThresholds: { 1: 15000, 2: 22000, 3: 30000 },
    storyDialogue: { character: 'Luna', text: "The Pet Parlor is done! Our furry friends look gorgeous!", image: 'luna_celebrate' },
  },
};

export const MAX_DEFINED_LEVEL = 20;

export function getLevel(levelId) {
  if (LEVELS[levelId]) return LEVELS[levelId];
  // Generate procedural level for levels beyond 20
  const { generateLevel } = require('../game/LevelGenerator');
  return generateLevel(levelId);
}
