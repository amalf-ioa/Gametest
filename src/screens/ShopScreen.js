import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useGame } from '../context/GameContext';
import IAPService from '../services/IAPService';

const TABS = ['Lives', 'Boosters', 'Stars', 'Bundles'];

const PRODUCTS = {
  Lives: [
    { id: 'lives_5', emoji: '\u2665', name: '5 Lives', desc: 'Restore 5 lives instantly', price: '$0.99', reward: { type: 'ADD_LIVES', amount: 5 } },
    { id: 'lives_unlimited_24h', emoji: '\u267E\uFE0F', name: 'Unlimited Lives', desc: '24 hours of unlimited lives', price: '$4.99', reward: { type: 'SET_UNLIMITED_LIVES', ms: 86400000 } },
  ],
  Boosters: [
    { id: 'rockets_3', emoji: '\uD83D\uDE80', name: '3 Rockets', desc: 'Clears an entire row or column', price: '$1.99', reward: { type: 'ADD_BOOSTER', booster: 'rockets', amount: 3 } },
    { id: 'bombs_3', emoji: '\uD83D\uDCA3', name: '3 Bombs', desc: 'Clears a 3x3 area', price: '$1.99', reward: { type: 'ADD_BOOSTER', booster: 'bombs', amount: 3 } },
    { id: 'rainbows_3', emoji: '\uD83C\uDF08', name: '3 Rainbows', desc: 'Clears all tiles of one type', price: '$2.99', reward: { type: 'ADD_BOOSTER', booster: 'rainbows', amount: 3 } },
    { id: 'booster_mix', emoji: '\uD83C\uDF81', name: 'Mixed Pack', desc: '3 of each booster type', price: '$4.99', reward: { type: 'BOOSTER_PACK', amounts: { rockets: 3, bombs: 3, rainbows: 3 } } },
  ],
  Stars: [
    { id: 'stars_10', emoji: '\u2B50', name: '10 Stars', desc: 'Use in Renovation', price: '$1.99', reward: { type: 'EARN_STARS', amount: 10 } },
    { id: 'stars_20', emoji: '\u2B50\u2B50', name: '20 Stars', desc: 'Great value!', price: '$2.99', reward: { type: 'EARN_STARS', amount: 20 } },
    { id: 'stars_50', emoji: '\uD83C\uDF1F', name: '50 Stars', desc: 'Best value!', price: '$6.99', reward: { type: 'EARN_STARS', amount: 50 } },
  ],
  Bundles: [
    { id: 'starter_pack', emoji: '\uD83C\uDF08', name: 'Starter Pack', desc: '24h lives + 10 boosters', price: '$4.99', reward: { type: 'BUNDLE_STARTER' } },
    { id: 'mega_pack', emoji: '\uD83D\uDC8E', name: 'Mega Pack', desc: '3-day lives + 30 boosters + 20 stars', price: '$9.99', reward: { type: 'BUNDLE_MEGA' } },
  ],
};

function ProductCard({ product, onBuy, loading }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardEmoji}>{product.emoji}</Text>
      <Text style={styles.cardName}>{product.name}</Text>
      <Text style={styles.cardDesc}>{product.desc}</Text>
      <TouchableOpacity style={styles.buyBtn} onPress={() => onBuy(product)} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.buyText}>{product.price}</Text>}
      </TouchableOpacity>
    </View>
  );
}

export default function ShopScreen({ navigation }) {
  const { dispatch } = useGame();
  const [tab, setTab] = useState('Lives');
  const [loadingId, setLoadingId] = useState(null);

  const handleBuy = async (product) => {
    setLoadingId(product.id);
    try {
      const res = await IAPService.purchaseItem(product.id, product.price);
      if (res.success) {
        applyReward(product.reward);
        Alert.alert('\uD83C\uDF89 Purchase Successful!', `${product.name} added to your account.`);
      }
    } catch (e) {
      Alert.alert('Purchase Failed', 'Please try again.');
    } finally {
      setLoadingId(null);
    }
  };

  const applyReward = (reward) => {
    switch (reward.type) {
      case 'ADD_LIVES':            dispatch({ type: 'ADD_LIVES', payload: reward.amount }); break;
      case 'SET_UNLIMITED_LIVES':  dispatch({ type: 'SET_UNLIMITED_LIVES', payload: reward.ms }); break;
      case 'ADD_BOOSTER':          dispatch({ type: 'ADD_BOOSTER', payload: { boosterType: reward.booster, amount: reward.amount } }); break;
      case 'EARN_STARS':           dispatch({ type: 'EARN_STARS', payload: reward.amount }); break;
      case 'BOOSTER_PACK':
        Object.entries(reward.amounts).forEach(([b, n]) =>
          dispatch({ type: 'ADD_BOOSTER', payload: { boosterType: b, amount: n } })
        ); break;
      case 'BUNDLE_STARTER':
        dispatch({ type: 'SET_UNLIMITED_LIVES', payload: 86400000 });
        ['rockets','bombs','rainbows'].forEach(b =>
          dispatch({ type: 'ADD_BOOSTER', payload: { boosterType: b, amount: 3 } })
        ); break;
      case 'BUNDLE_MEGA':
        dispatch({ type: 'SET_UNLIMITED_LIVES', payload: 259200000 });
        ['rockets','bombs','rainbows'].forEach(b =>
          dispatch({ type: 'ADD_BOOSTER', payload: { boosterType: b, amount: 10 } })
        );
        dispatch({ type: 'EARN_STARS', payload: 20 }); break;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>\uD83D\uDED2  Shop</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
            <Text style={styles.closeText}>\u2715</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {TABS.map(t => (
            <TouchableOpacity key={t} style={[styles.tabBtn, tab === t && styles.tabActive]} onPress={() => setTab(t)}>
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Products */}
        <ScrollView contentContainerStyle={styles.grid}>
          {(PRODUCTS[tab] || []).map(p => (
            <ProductCard key={p.id} product={p} onBuy={handleBuy} loading={loadingId === p.id} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFACD' },
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#87CEEB' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  closeBtn: { padding: 6 },
  closeText: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
  tabs: { flexDirection: 'row', backgroundColor: '#fff', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 2 },
  tabBtn: { flex: 1, paddingVertical: 13, alignItems: 'center' },
  tabActive: { borderBottomWidth: 3, borderBottomColor: '#4CAF50' },
  tabText: { fontSize: 14, color: '#888', fontWeight: '500' },
  tabTextActive: { color: '#4CAF50', fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 12, justifyContent: 'space-around' },
  card: { width: '46%', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 14, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardEmoji: { fontSize: 38, marginBottom: 8 },
  cardName: { fontSize: 15, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  cardDesc: { fontSize: 12, color: '#888', textAlign: 'center', marginTop: 4, marginBottom: 12 },
  buyBtn: { backgroundColor: '#4CAF50', paddingVertical: 9, paddingHorizontal: 24, borderRadius: 20, minWidth: 80, alignItems: 'center' },
  buyText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});
