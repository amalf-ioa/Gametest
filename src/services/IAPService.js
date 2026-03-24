// IAPService.js — stub implementation.
// Replace with expo-in-app-purchases or react-native-iap when ready.

class IAPService {
  async initialize() {
    console.log('[IAPService] Initialized (stub)');
  }

  async purchaseItem(productId, price) {
    return new Promise(resolve => {
      console.log(`[IAPService] Purchasing ${productId} for ${price}`);
      setTimeout(() => resolve({ success: true, productId }), 1000);
    });
  }

  async restorePurchases() {
    return new Promise(resolve => {
      setTimeout(() => resolve({ success: true, purchases: [] }), 800);
    });
  }
}

export default new IAPService();
