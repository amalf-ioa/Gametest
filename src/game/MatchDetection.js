import { GRID_SIZE } from '../data/constants';

/**
 * Detect all horizontal and vertical matches of 3+ on the board.
 * Returns { matches, matchedSet } where matchedSet is a Set of 'row,col' keys.
 */
export function detectMatches(board) {
  const matchedSet = new Set();
  const matches = [];

  // Horizontal matches
  for (let row = 0; row < GRID_SIZE; row++) {
    let col = 0;
    while (col < GRID_SIZE - 2) {
      const tile = board[row][col];
      if (!tile || tile.obstacle) { col++; continue; }

      let len = 1;
      while (col + len < GRID_SIZE) {
        const next = board[row][col + len];
        if (next && !next.obstacle && next.type === tile.type && !next.powerUp) {
          len++;
        } else break;
      }

      if (len >= 3) {
        const matchTiles = [];
        for (let i = 0; i < len; i++) matchTiles.push({ row, col: col + i });
        matches.push({ tiles: matchTiles, length: len, direction: 'horizontal', tileType: tile.type });
        matchTiles.forEach(t => matchedSet.add(`${t.row},${t.col}`));
      }
      col += len;
    }
  }

  // Vertical matches
  for (let col = 0; col < GRID_SIZE; col++) {
    let row = 0;
    while (row < GRID_SIZE - 2) {
      const tile = board[row][col];
      if (!tile || tile.obstacle) { row++; continue; }

      let len = 1;
      while (row + len < GRID_SIZE) {
        const next = board[row + len][col];
        if (next && !next.obstacle && next.type === tile.type && !next.powerUp) {
          len++;
        } else break;
      }

      if (len >= 3) {
        const matchTiles = [];
        for (let i = 0; i < len; i++) matchTiles.push({ row: row + i, col });
        matches.push({ tiles: matchTiles, length: len, direction: 'vertical', tileType: tile.type });
        matchTiles.forEach(t => matchedSet.add(`${t.row},${t.col}`));
      }
      row += len;
    }
  }

  return { matches, matchedSet };
}

/**
 * Check if two grid positions are orthogonally adjacent.
 */
export function areAdjacent(pos1, pos2) {
  const rowDiff = Math.abs(pos1.row - pos2.row);
  const colDiff = Math.abs(pos1.col - pos2.col);
  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

/**
 * Determine what power-up to create from a match.
 * swapRow/swapCol = position of the swapped tile that created the match.
 */
export function determinePowerUp(match, swapRow, swapCol) {
  const { length, direction, tiles } = match;

  if (length >= 5) {
    // 5+ in a line -> bomb (clears 3x3)
    // Find the closest tile to the swap position
    const pos = findClosestTile(tiles, swapRow, swapCol);
    return { type: 'bomb', row: pos.row, col: pos.col };
  }

  if (length === 4) {
    const pos = findClosestTile(tiles, swapRow, swapCol);
    return {
      type: direction === 'horizontal' ? 'rocket_h' : 'rocket_v',
      row: pos.row,
      col: pos.col,
    };
  }

  return null;
}

function findClosestTile(tiles, row, col) {
  let best = tiles[0];
  let bestDist = Infinity;
  tiles.forEach(t => {
    const d = Math.abs(t.row - row) + Math.abs(t.col - col);
    if (d < bestDist) { bestDist = d; best = t; }
  });
  return best;
}

/**
 * Check if any valid move exists on the board.
 * Returns false when no moves remain (shuffle needed).
 */
export function hasValidMoves(board) {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (col + 1 < GRID_SIZE) {
        const swapped = doSwap(board, row, col, row, col + 1);
        if (detectMatches(swapped).matchedSet.size > 0) return true;
      }
      if (row + 1 < GRID_SIZE) {
        const swapped = doSwap(board, row, col, row + 1, col);
        if (detectMatches(swapped).matchedSet.size > 0) return true;
      }
    }
  }
  return false;
}

function doSwap(board, r1, c1, r2, c2) {
  const copy = board.map(r => [...r]);
  [copy[r1][c1], copy[r2][c2]] = [copy[r2][c2], copy[r1][c1]];
  return copy;
}
