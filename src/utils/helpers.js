/**
 * Clamp a value between min and max.
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Deep clone a 2D board array.
 */
export function cloneBoard(board) {
  return board.map(row => row.map(tile => (tile ? { ...tile } : null)));
}

/**
 * Convert a Set of 'row,col' keys to array of { row, col } objects.
 */
export function setToPositions(set) {
  return Array.from(set).map(key => {
    const [row, col] = key.split(',').map(Number);
    return { row, col };
  });
}

/**
 * Return a shuffled copy of an array (Fisher-Yates).
 */
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Format a number with commas, e.g. 1234567 -> "1,234,567".
 */
export function formatNumber(n) {
  return n.toLocaleString();
}

/**
 * Linear interpolation.
 */
export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Check if objectives are satisfied.
 * objectives: { dogbone: 10, score: 3000, clearBoard: true }
 * progress:   { dogbone: 12, score: 3500, clearBoard: false }
 */
export function checkObjectivesComplete(objectives, progress) {
  for (const [key, target] of Object.entries(objectives)) {
    const current = progress[key] ?? 0;
    if (key === 'clearBoard') {
      if (!current) return false;
    } else if (current < target) {
      return false;
    }
  }
  return true;
}
