import { GRID_SIZE, POWER_UP_SCORES } from '../data/constants';

/**
 * Get all board cells affected by activating a power-up at (row, col).
 */
export function getPowerUpCells(board, row, col) {
  const tile = board[row][col];
  if (!tile?.powerUp) return [];

  switch (tile.powerUp) {
    case 'rocket_h': {
      const cells = [];
      for (let c = 0; c < GRID_SIZE; c++) cells.push({ row, col: c });
      return cells;
    }
    case 'rocket_v': {
      const cells = [];
      for (let r = 0; r < GRID_SIZE; r++) cells.push({ row: r, col });
      return cells;
    }
    case 'bomb': {
      const cells = [];
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++) {
          const r = row + dr, c = col + dc;
          if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE)
            cells.push({ row: r, col: c });
        }
      return cells;
    }
    case 'rainbow': {
      // Clear all tiles of the same type as the swapped-with tile
      const targetType = tile.type;
      const cells = [];
      for (let r = 0; r < GRID_SIZE; r++)
        for (let c = 0; c < GRID_SIZE; c++)
          if (board[r]?.[c]?.type === targetType && !board[r][c].obstacle)
            cells.push({ row: r, col: c });
      return cells;
    }
    default:
      return [];
  }
}

/**
 * Activate a power-up. Returns { affectedCells, score, chainPowerUps }.
 */
export function activatePowerUp(board, row, col) {
  const tile = board[row][col];
  if (!tile?.powerUp) return { affectedCells: [], score: 0, chainPowerUps: [] };

  const affectedCells = getPowerUpCells(board, row, col);
  const baseType = tile.powerUp.replace('_h', '').replace('_v', '');
  const score = (POWER_UP_SCORES[baseType] || 1000) + affectedCells.length * 30;

  // Detect chained power-ups in the affected area
  const chainPowerUps = affectedCells
    .filter(({ row: r, col: c }) => !(r === row && c === col) && board[r]?.[c]?.powerUp)
    .map(({ row: r, col: c }) => ({ row: r, col: c }));

  return { affectedCells, score, chainPowerUps };
}

/**
 * Activate a booster from inventory targeting a specific cell.
 */
export function activateBooster(board, boosterType, targetRow, targetCol) {
  const cells = [];

  if (boosterType === 'rockets') {
    for (let c = 0; c < GRID_SIZE; c++) cells.push({ row: targetRow, col: c });
  } else if (boosterType === 'bombs') {
    for (let dr = -1; dr <= 1; dr++)
      for (let dc = -1; dc <= 1; dc++) {
        const r = targetRow + dr, c = targetCol + dc;
        if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE)
          cells.push({ row: r, col: c });
      }
  } else if (boosterType === 'rainbows') {
    const targetType = board[targetRow]?.[targetCol]?.type;
    if (targetType) {
      for (let r = 0; r < GRID_SIZE; r++)
        for (let c = 0; c < GRID_SIZE; c++)
          if (board[r]?.[c]?.type === targetType && !board[r][c].obstacle)
            cells.push({ row: r, col: c });
    }
  }

  return cells;
}
