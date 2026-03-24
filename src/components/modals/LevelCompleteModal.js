import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import AudioManager from '../../services/AudioManager';

export default function LevelCompleteModal({ visible, stars, score, onNext, onMenu }) {
  const s1 = useRef(new Animated.Value(0)).current;
  const s2 = useRef(new Animated.Value(0)).current;
  const s3 = useRef(new Animated.Value(0)).current;
  const containerY = useRef(new Animated.Value(60)).current;
  const containerOp = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;
    s1.setValue(0); s2.setValue(0); s3.setValue(0);
    containerY.setValue(60); containerOp.setValue(0);

    AudioManager.playSound('levelComplete');

    Animated.parallel([
      Animated.timing(containerOp, { toValue: 1, duration: 280, useNativeDriver: true }),
      Animated.spring(containerY, { toValue: 0, friction: 8, useNativeDriver: true }),
    ]).start();

    Animated.stagger(280, [
      Animated.spring(s1, { toValue: 1, friction: 3, useNativeDriver: true }),
      Animated.spring(s2, { toValue: stars >= 2 ? 1 : 0.3, friction: 3, useNativeDriver: true }),
      Animated.spring(s3, { toValue: stars >= 3 ? 1 : 0.3, friction: 3, useNativeDriver: true }),
    ]).start();
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <Animated.View style={[styles.modal, { opacity: containerOp, transform: [{ translateY: containerY }] }]}>
          <Text style={styles.title}>Level Complete!</Text>
          <View style={styles.starsRow}>
            {[s1, s2, s3].map((sv, i) => (
              <Animated.Text key={i} style={[styles.star, { transform: [{ scale: sv }] }]}>
                {i < stars ? '\u2B50' : '\u2606'}
              </Animated.Text>
            ))}
          </View>
          <Text style={styles.score}>Score: {score.toLocaleString()}</Text>
          <TouchableOpacity style={styles.btnNext} onPress={onNext}>
            <Text style={styles.btnText}>Next Level</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnMenu} onPress={onMenu}>
            <Text style={styles.btnMenuText}>Main Menu</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.65)', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: '#fff', borderRadius: 22, padding: 32, width: '82%', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 10 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#4CAF50', marginBottom: 18 },
  starsRow: { flexDirection: 'row', marginBottom: 18 },
  star: { fontSize: 48, marginHorizontal: 8 },
  score: { fontSize: 22, fontWeight: '600', color: '#333', marginBottom: 28 },
  btnNext: { backgroundColor: '#4CAF50', paddingVertical: 14, paddingHorizontal: 48, borderRadius: 26, marginBottom: 12, width: '100%', alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  btnMenu: { paddingVertical: 10 },
  btnMenuText: { color: '#888', fontSize: 15 },
});
