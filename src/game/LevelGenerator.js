import { TILE_TYPES } from '../data/constants';

export function generateLevel(levelNumber) {
  const difficulty = getDifficulty(levelNumber);
  const area = getArea(levelNumber);
  return {
    id: levelNumber,
    area,
    difficulty,
    moves: getMoves(difficulty, levelNumber),
    objectives: getObjectives(difficulty, levelNumber),
    obstacles: getObstacles(difficulty, levelNumber),
    boardSize: 8,
    tileTypes: TILE_TYPES,
    starThresholds: getStarThresholds(difficulty, levelNumber),
  };
}

function getDifficulty(l) {
  if (l <= 5) return 'tutorial';
  if (l <= 20) return 'easy';
  if (l <= 50) return 'medium';
  if (l <= 80) return 'hard';
  return 'expert';
}

function getArea(l) {
  if (l <= 20) return 'entryGarden';
  if (l <= 40) return 'petParlor';
  if (l <= 60) return 'backyard';
  if (l <= 80) return 'playRoom';
  return 'paradise';
}

function getMoves(diff, l) {
  const base = { tutorial: 40, easy: 30, medium: 25, hard: 20, expert: 16 };
  return Math.max(10, (base[diff] || 25) - Math.floor((l % 20) * 0.4));
}

function getObjectives(diff, l) {
  const mult = { tutorial: 0.5, easy: 0.8, medium: 1.0, hard: 1.3, expert: 1.6 }[diff] || 1;
  const types = ['dogbone', 'cattoy', 'fishtreat', 'birdseed'];
  const numTypes = Math.min(2 + Math.floor(l / 20), 3);
  const obj = {};
  for (let i = 0; i < numTypes; i++) {
    obj[types[i % types.length]] = Math.floor((10 + l * 0.4) * mult);
  }
  obj.score = Math.floor(2000 * mult * (1 + l * 0.08));
  return obj;
}

function getObstacles(diff, l) {
  if (diff === 'tutorial') return [];
  const obstacles = [];
  const n = Math.min(Math.floor(l / 8), 6);
  if (n > 0) obstacles.push({ type: 'box', positions: randomPositions(n), hits: 1 });
  if (diff === 'hard' || diff === 'expert') {
    obstacles.push({ type: 'cage', positions: randomPositions(Math.floor(n / 2)), hits: 2 });
  }
  return obstacles;
}

function randomPositions(count) {
  const used = new Set();
  const positions = [];
  while (positions.length < count) {
    const r = 1 + Math.floor(Math.random() * 6);
    const c = 1 + Math.floor(Math.random() * 6);
    const key = `${r},${c}`;
    if (!used.has(key)) { used.add(key); positions.push([r, c]); }
  }
  return positions;
}

function getStarThresholds(diff, l) {
  const base = Math.floor(2000 * (1 + l * 0.1));
  return { 1: base, 2: Math.floor(base * 1.5), 3: Math.floor(base * 2) };
}
