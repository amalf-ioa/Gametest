// AdService.js — stub implementation.
// Replace with AdMob / Unity Ads / AppLovin when ready.

class AdService {
  async showRewardedAd(rewardType) {
    return new Promise(resolve => {
      console.log('[AdService] Showing rewarded ad for:', rewardType);
      setTimeout(() => resolve({ success: true, reward: rewardType }), 1500);
    });
  }

  async showInterstitial() {
    return new Promise(resolve => {
      console.log('[AdService] Showing interstitial ad');
      setTimeout(() => resolve({ success: true }), 1500);
    });
  }

  async initialize() {
    console.log('[AdService] Initialized (stub)');
  }
}

export default new AdService();
