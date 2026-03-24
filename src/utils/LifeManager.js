import { MAX_LIVES, LIFE_REGEN_TIME } from '../data/constants';

const LifeManager = {
  getLivesRemaining(lastLifeTime, currentLives) {
    if (currentLives >= MAX_LIVES) return MAX_LIVES;
    const passed = Date.now() - lastLifeTime;
    const recovered = Math.floor(passed / LIFE_REGEN_TIME);
    return Math.min(MAX_LIVES, currentLives + recovered);
  },

  getTimeUntilNextLife(lastLifeTime, currentLives) {
    if (currentLives >= MAX_LIVES) return 0;
    const passed = Date.now() - lastLifeTime;
    return LIFE_REGEN_TIME - (passed % LIFE_REGEN_TIME);
  },

  formatTime(ms) {
    const total = Math.max(0, Math.floor(ms / 1000));
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  },
};

export default LifeManager;
