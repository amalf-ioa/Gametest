import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useGame } from '../context/GameContext';
import { LEVELS } from '../data/levels';

const COLUMNS = 5;
const TOTAL_LEVELS = 20;

function LevelButton({ levelId, stars, isUnlocked, isCurrent, onPress }) {
  if (!isUnlocked) {
    return (
      <View style={[styles.btn, styles.btnLocked]}>
        <Text style={styles.lockIcon}>\uD83D\uDD12</Text>
        <Text style={styles.btnNumLocked}>{levelId}</Text>
      </View>
    );
  }

  const bgColor = isCurrent ? '#FFD700' : stars > 0 ? '#4CAF50' : '#2196F3';
  return (
    <TouchableOpacity style={[styles.btn, { backgroundColor: bgColor }]} onPress={() => onPress(levelId)} activeOpacity={0.82}>
      <Text style={styles.btnNum}>{levelId}</Text>
      <View style={styles.starsRow}>
        {[1,2,3].map(i => <Text key={i} style={styles.starIcon}>{i <= stars ? '\u2B50' : '\u2606'}</Text>)}
      </View>
    </TouchableOpacity>
  );
}

export default function LevelSelectScreen({ navigation }) {
  const { state } = useGame();

  const handleLevelPress = (levelId) => {
    const level = LEVELS[levelId];
    if (level) navigation.navigate('GameBoard', { levelId });
  };

  const levels = Array.from({ length: TOTAL_LEVELS }, (_, i) => i + 1);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>\u2190 Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Select Level</Text>
          <View style={{ width: 70 }} />
        </View>

        <FlatList
          data={levels}
          numColumns={COLUMNS}
          keyExtractor={item => String(item)}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <LevelButton
              levelId={item}
              stars={state.levelStars[item] || 0}
              isUnlocked={item <= state.highestLevelUnlocked}
              isCurrent={item === state.highestLevelUnlocked}
              onPress={handleLevelPress}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#87CEEB' },
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: 'rgba(255,255,255,0.2)' },
  backBtn: { paddingHorizontal: 8, paddingVertical: 4 },
  backText: { fontSize: 16, color: '#fff', fontWeight: '600' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  grid: { padding: 16 },
  btn: { width: 60, height: 70, margin: 5, borderRadius: 12, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.18, shadowRadius: 3, elevation: 4 },
  btnLocked: { backgroundColor: '#B0BEC5' },
  btnNum: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  btnNumLocked: { fontSize: 14, color: '#fff', marginTop: 2 },
  lockIcon: { fontSize: 16 },
  starsRow: { flexDirection: 'row', marginTop: 3 },
  starIcon: { fontSize: 9 },
});
