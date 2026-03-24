import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  GAME_STATE: '@pet_paradise_game_state',
  SETTINGS: '@pet_paradise_settings',
  LEVEL_PREFIX: '@pet_paradise_level_',
};

class StorageService {
  async saveGameState(state) {
    try {
      await AsyncStorage.setItem(KEYS.GAME_STATE, JSON.stringify(state));
    } catch (e) {
      console.warn('StorageService.saveGameState:', e);
    }
  }

  async loadGameState() {
    try {
      const raw = await AsyncStorage.getItem(KEYS.GAME_STATE);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn('StorageService.loadGameState:', e);
      return null;
    }
  }

  async saveLevelProgress(levelId, stars, score) {
    try {
      const key = `${KEYS.LEVEL_PREFIX}${levelId}`;
      await AsyncStorage.setItem(key, JSON.stringify({ stars, score, completedAt: Date.now() }));
    } catch (e) {
      console.warn('StorageService.saveLevelProgress:', e);
    }
  }

  async getLevelProgress(levelId) {
    try {
      const raw = await AsyncStorage.getItem(`${KEYS.LEVEL_PREFIX}${levelId}`);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  async clearAllData() {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.warn('StorageService.clearAllData:', e);
    }
  }
}

export default new StorageService();
