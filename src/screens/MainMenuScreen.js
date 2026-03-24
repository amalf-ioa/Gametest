import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, SafeAreaView } from 'react-native';
import { useGame } from '../context/GameContext';
import LifeDisplay from '../components/LifeDisplay';
import AudioManager from '../services/AudioManager';

export default function MainMenuScreen({ navigation }) {
  const { state } = useGame();
  const titleY = useRef(new Animated.Value(-60)).current;
  const titleOp = useRef(new Animated.Value(0)).current;
  const btnScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    AudioManager.playMusic('menu');
    Animated.parallel([
      Animated.timing(titleY, { toValue: 0, duration: 700, useNativeDriver: true }),
      Animated.timing(titleOp, { toValue: 1, duration: 700, useNativeDriver: true }),
    ]).start();

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.spring(btnScale, { toValue: 1.06, friction: 4, useNativeDriver: true }),
        Animated.spring(btnScale, { toValue: 1, friction: 4, useNativeDriver: true }),
      ])
    );
    const t = setTimeout(() => pulse.start(), 1000);
    return () => { clearTimeout(t); pulse.stop(); };
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.iconText}>\u2699\uFE0F</Text>
          </TouchableOpacity>
          <LifeDisplay lives={state.livesRemaining} lastLifeTime={state.lastLifeTime} />
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Shop')}>
            <Text style={styles.iconText}>\uD83D\uDED2</Text>
          </TouchableOpacity>
        </View>

        {/* Stars balance */}
        <View style={styles.starsRow}>
          <Text style={styles.starsText}>\u2B50 {state.totalStarsEarned}</Text>
        </View>

        {/* Title */}
        <Animated.View style={{ opacity: titleOp, transform: [{ translateY: titleY }] }}>
          <Text style={styles.titleEmoji}>\uD83D\uDC3E</Text>
          <Text style={styles.title}>Pet Paradise</Text>
          <Text style={styles.titleSub}>Makeover</Text>
        </Animated.View>

        {/* Characters */}
        <View style={styles.characters}>
          <Text style={styles.charEmoji}>\uD83D\uDC36</Text>
          <Text style={styles.charEmoji}>\uD83D\uDC69</Text>
          <Text style={styles.charEmoji}>\uD83D\uDC31</Text>
        </View>

        {/* Play button */}
        <Animated.View style={{ transform: [{ scale: btnScale }] }}>
          <TouchableOpacity
            style={styles.playBtn}
            onPress={() => navigation.navigate('LevelSelect')}
            activeOpacity={0.85}
          >
            <Text style={styles.playText}>\u25B6  Play</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Renovation button */}
        <TouchableOpacity
          style={styles.renovBtn}
          onPress={() => navigation.navigate('Renovation', { areaId: 'entryGarden' })}
          activeOpacity={0.85}
        >
          <Text style={styles.renovText}>\uD83C\uDFE1  Renovation</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#87CEEB' },
  container: { flex: 1, alignItems: 'center', backgroundColor: '#87CEEB', paddingHorizontal: 20 },
  topBar: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, paddingHorizontal: 8 },
  iconBtn: { padding: 8 },
  iconText: { fontSize: 26 },
  starsRow: { marginTop: 6, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 20, paddingHorizontal: 18, paddingVertical: 5 },
  starsText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  titleEmoji: { fontSize: 70, textAlign: 'center', marginTop: 20 },
  title: { fontSize: 34, fontWeight: 'bold', color: '#fff', textAlign: 'center', textShadowColor: 'rgba(0,0,0,0.15)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3 },
  titleSub: { fontSize: 20, color: '#FFD700', textAlign: 'center', letterSpacing: 4, fontWeight: '600' },
  characters: { flexDirection: 'row', marginVertical: 24 },
  charEmoji: { fontSize: 48, marginHorizontal: 12 },
  playBtn: { backgroundColor: '#4CAF50', paddingVertical: 16, paddingHorizontal: 70, borderRadius: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 6, elevation: 6, marginBottom: 14 },
  playText: { color: '#fff', fontSize: 22, fontWeight: 'bold', letterSpacing: 1 },
  renovBtn: { backgroundColor: '#FFB6C1', paddingVertical: 13, paddingHorizontal: 50, borderRadius: 26, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 4 },
  renovText: { color: '#555', fontSize: 17, fontWeight: '600' },
});
