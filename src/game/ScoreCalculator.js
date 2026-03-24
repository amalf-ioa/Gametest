import { MATCH_SCORES, CASCADE_MULTIPLIERS, POWER_UP_SCORES } from '../data/constants';

/**
 * Score for a set of matches at a given cascade level.
 */
export function calculateMatchScore(matches, cascadeLevel = 0) {
  const mult = CASCADE_MULTIPLIERS[Math.min(cascadeLevel, CASCADE_MULTIPLIERS.length - 1)];
  let total = 0;
  matches.forEach(match => {
    const base = MATCH_SCORES[Math.min(match.length, 5)] ?? MATCH_SCORES[5];
    total += base * mult;
  });
  return Math.floor(total);
}

/**
 * How many stars does a score earn for a level?
 */
export function calculateStars(score, starThresholds) {
  if (score >= starThresholds[3]) return 3;
  if (score >= starThresholds[2]) return 2;
  if (score >= starThresholds[1]) return 1;
  return 0;
}

export function formatScore(n) {
  return n.toLocaleString();
}

export function calculatePowerUpScore(powerUpType, cellCount) {
  const base = POWER_UP_SCORES[powerUpType.replace('_h','').replace('_v','')] ?? 1000;
  return base + cellCount * 50;
}
