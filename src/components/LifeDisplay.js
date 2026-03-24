import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LifeManager from '../utils/LifeManager';
import { MAX_LIVES } from '../data/constants';

export default function LifeDisplay({ lives, lastLifeTime }) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    if (lives >= MAX_LIVES) { setTimeStr(''); return; }
    const update = () => {
      const ms = LifeManager.getTimeUntilNextLife(lastLifeTime, lives);
      setTimeStr(LifeManager.formatTime(ms));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [lives, lastLifeTime]);

  return (
    <View style={styles.container}>
      <View style={styles.hearts}>
        {Array.from({ length: MAX_LIVES }).map((_, i) => (
          <Text key={i} style={[styles.heart, i >= lives && styles.heartEmpty]}>
            {i < lives ? '\u2665' : '\u2661'}
          </Text>
        ))}
      </View>
      {lives < MAX_LIVES && timeStr ? (
        <Text style={styles.timer}>Next life: {timeStr}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  hearts: { flexDirection: 'row' },
  heart: { fontSize: 22, marginHorizontal: 2, color: '#FF69B4' },
  heartEmpty: { color: '#ccc' },
  timer: { fontSize: 11, color: '#888', marginTop: 2 },
});
