export const GRID_SIZE = 8;
export const TILE_SIZE = 45;
export const TILE_MARGIN = 2;
export const BOARD_PADDING = 8;

export const TILE_TYPES = ['dogbone', 'cattoy', 'fishtreat', 'birdseed', 'heart', 'star'];

export const TILE_EMOJIS = {
  dogbone: '🦴',
  cattoy: '🐱',
  fishtreat: '🐟',
  birdseed: '🌾',
  heart: '💖',
  star: '⭐',
};

export const POWER_UP_EMOJIS = {
  rocket_h: '🚀',
  rocket_v: '🚀',
  bomb: '💣',
  rainbow: '🌈',
};

export const COLORS = {
  primary: '#87CEEB',
  secondary: '#FFB6C1',
  accent: '#90EE90',
  highlight: '#FFD700',
  background: '#FFFACD',
  boardBg: '#D4E9FF',
  tileColors: {
    dogbone: '#CD853F',
    cattoy: '#9370DB',
    fishtreat: '#FFA500',
    birdseed: '#DAA520',
    heart: '#FF69B4',
    star: '#FF6347',
  },
  obstacle: {
    box: '#A0522D',
    stone: '#808080',
    cage: '#B8860B',
    ice: '#ADD8E6',
  },
  buttonPrimary: '#4CAF50',
  buttonSecondary: '#2196F3',
  buttonWarning: '#FF9800',
  buttonDanger: '#F44336',
  textPrimary: '#333333',
  textSecondary: '#666666',
  textLight: '#FFFFFF',
};

export const MATCH_SCORES = {
  3: 100,
  4: 250,
  5: 500,
};

export const CASCADE_MULTIPLIERS = [1, 1.5, 2, 2.5, 3];

export const POWER_UP_SCORES = {
  rocket: 1000,
  bomb: 1500,
  rainbow: 2000,
};

export const MAX_LIVES = 5;
export const LIFE_REGEN_TIME = 30 * 60 * 1000; // 30 minutes in ms

export const ANIMATION_DURATIONS = {
  swap: 220,
  revert: 220,
  destroy: 180,
  fall: 300,
  powerUp: 450,
  modal: 300,
  stagger: 80,
};

export const OBSTACLE_TYPES = {
  BOX: 'box',
  STONE: 'stone',
  CAGE: 'cage',
  ICE: 'ice',
};
