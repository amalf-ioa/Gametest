// AudioManager.js
// Wraps expo-av for BGM and SFX. Sounds are stubs until real assets are added.

let Audio;
try { Audio = require('expo-av').Audio; } catch { Audio = null; }

class AudioManager {
  constructor() {
    this.sounds = {};
    this.music = null;
    this.musicVolume = 0.7;
    this.sfxVolume = 0.8;
    this.enabled = true;
  }

  async loadSounds() {
    if (!Audio) return;
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });
      // Sounds loaded lazily when first played to keep startup fast.
    } catch (e) {
      console.warn('AudioManager.loadSounds:', e);
    }
  }

  async playSound(name) {
    if (!Audio || !this.enabled) return;
    // Stub: sounds are placeholders. Replace require paths with real assets.
    const soundMap = {
      tileSelect: null,
      tileSwap: null,
      match3: null,
      powerUp: null,
      levelComplete: null,
      levelFail: null,
      starEarn: null,
      buttonPress: null,
      purchase: null,
    };
    // When real assets exist, load and play them:
    // const { sound } = await Audio.Sound.createAsync(soundMap[name]);
    // await sound.setVolumeAsync(this.sfxVolume);
    // await sound.playAsync();
  }

  async playMusic(trackName) {
    if (!Audio || !this.enabled) return;
    try {
      if (this.music) {
        await this.music.stopAsync();
        await this.music.unloadAsync();
        this.music = null;
      }
      // Stub: replace require with real asset path
      // const { sound } = await Audio.Sound.createAsync(
      //   require(`../assets/music/${trackName}.mp3`),
      //   { isLooping: true, volume: this.musicVolume }
      // );
      // this.music = sound;
      // await sound.playAsync();
    } catch (e) {
      console.warn('AudioManager.playMusic:', e);
    }
  }

  async stopMusic() {
    if (this.music) {
      try { await this.music.stopAsync(); } catch {}
    }
  }

  setMusicVolume(v) {
    this.musicVolume = v;
    this.music?.setVolumeAsync(v).catch(() => {});
  }

  setSfxVolume(v) { this.sfxVolume = v; }

  setEnabled(flag) {
    this.enabled = flag;
    if (!flag) this.stopMusic();
  }
}

export default new AudioManager();
