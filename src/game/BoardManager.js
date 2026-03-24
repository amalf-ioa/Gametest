import { GRID_SIZE, TILE_TYPES } from '../data/constants';
import { detectMatches } from './MatchDetection';

let _idCounter = 0;
const genId = () => `t${++_idCounter}`;

// ─── Tile factory ────────────────────────────────────────────────────────────

export function createTile(type, row, col, powerUp = null) {
  return { id: genId(), type, row, col, powerUp, obstacle: null, hits: 1, isNew: false };
}

export function createObstacleTile(obstacleType, row, col, hits = 1) {
  return { id: genId(), type: null, row, col, powerUp: null, obstacle: obstacleType, hits };
}

// ─── Board initialisation ─────────────────────────────────────────────────────

export function initializeBoard(level) {
  const types = level.tileTypes || TILE_TYPES;
  const board = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));

  // Place obstacles first
  (level.obstacles || []).forEach(obs => {
    obs.positions.forEach(([r, c]) => {
      board[r][c] = createObstacleTile(obs.type, r, c, obs.hits ?? 1);
    });
  });

  // Fill remaining cells, avoiding initial matches
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (board[r][c]) continue;
      let type, attempts = 0;
      do {
        type = types[Math.floor(Math.random() * types.length)];
        attempts++;
      } while (attempts < 20 && wouldMatch(board, r, c, type));
      board[r][c] = createTile(type, r, c);
    }
  }

  return board;
}

function wouldMatch(board, row, col, type) {
  // 2 matching to the left
  if (col >= 2 && board[row][col - 1]?.type === type && board[row][col - 2]?.type === type) return true;
  // 2 matching above
  if (row >= 2 && board[row - 1]?.[col]?.type === type && board[row - 2]?.[col]?.type === type) return true;
  return false;
}

// ─── Swap ─────────────────────────────────────────────────────────────────────

export function swapTilesOnBoard(board, r1, c1, r2, c2) {
  const b = board.map(row => [...row]);
  b[r1][c1] = { ...b[r1][c1], row: r2, col: c2 };
  b[r2][c2] = { ...b[r2][c2], row: r1, col: c1 };
  [b[r1][c1], b[r2][c2]] = [b[r2][c2], b[r1][c1]];
  // Fix row/col after swap
  b[r1][c1] = { ...b[r1][c1], row: r1, col: c1 };
  b[r2][c2] = { ...b[r2][c2], row: r2, col: c2 };
  return b;
}

// ─── Remove matched tiles ─────────────────────────────────────────────────────

export function removeMatchedTiles(board, matchedSet) {
  const b = board.map(row => row.map(t => t ? { ...t } : null));

  matchedSet.forEach(key => {
    const [r, c] = key.split(',').map(Number);
    b[r][c] = null;
    // Hit adjacent obstacles
    [[-1,0],[1,0],[0,-1],[0,1]].forEach(([dr, dc]) => {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE && b[nr][nc]?.obstacle) {
        b[nr][nc] = { ...b[nr][nc], hits: b[nr][nc].hits - 1 };
        if (b[nr][nc].hits <= 0) b[nr][nc] = null;
      }
    });
  });

  return b;
}

// ─── Gravity & refill ─────────────────────────────────────────────────────────

export function applyGravity(board, availableTypes) {
  const types = availableTypes || TILE_TYPES;
  const b = board.map(row => [...row]);
  const newTileIds = new Set();

  for (let col = 0; col < GRID_SIZE; col++) {
    // Collect existing non-null tiles (bottom-to-top)
    const existing = [];
    for (let row = GRID_SIZE - 1; row >= 0; row--) {
      if (b[row][col] !== null) existing.push(b[row][col]);
    }

    // Fill from bottom, adding new tiles at top
    for (let row = GRID_SIZE - 1; row >= 0; row--) {
      const idx = GRID_SIZE - 1 - row;
      if (idx < existing.length) {
        b[row][col] = { ...existing[idx], row, col };
      } else {
        const tile = createTile(types[Math.floor(Math.random() * types.length)], row, col);
        tile.isNew = true;
        newTileIds.add(tile.id);
        b[row][col] = tile;
      }
    }
  }

  return { board: b, newTileIds };
}

// ─── Power-up placement ───────────────────────────────────────────────────────

export function placePowerUp(board, row, col, powerUpType, tileType) {
  const b = board.map(r => [...r]);
  b[row][col] = createTile(tileType, row, col, powerUpType);
  return b;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function countNonObstacleTiles(board) {
  let count = 0;
  for (let r = 0; r < GRID_SIZE; r++)
    for (let c = 0; c < GRID_SIZE; c++)
      if (board[r]?.[c] && !board[r][c].obstacle) count++;
  return count;
}

export function countTileType(board, type) {
  let count = 0;
  for (let r = 0; r < GRID_SIZE; r++)
    for (let c = 0; c < GRID_SIZE; c++)
      if (board[r]?.[c]?.type === type) count++;
  return count;
}
