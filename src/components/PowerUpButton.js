import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { POWER_UP_EMOJIS, COLORS } from '../data/constants';
import { animateButtonPress } from '../utils/animations';

export default function PowerUpButton({ type, count, onPress, disabled }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (disabled || count <= 0) return;
    animateButtonPress(scale);
    onPress(type);
  };

  const isAvailable = !disabled && count > 0;

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        style={[styles.btn, !isAvailable && styles.btnDisabled]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Text style={styles.emoji}>{POWER_UP_EMOJIS[type] || '?'}</Text>
        <Text style={[styles.count, !isAvailable && styles.countDisabled]}>x{count}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.buttonSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  btnDisabled: { backgroundColor: '#aaa' },
  emoji: { fontSize: 24 },
  count: { fontSize: 11, color: '#fff', fontWeight: 'bold' },
  countDisabled: { color: '#ddd' },
});
