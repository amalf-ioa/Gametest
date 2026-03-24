import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TILE_EMOJIS, COLORS } from '../data/constants';

export default function ObjectiveTracker({ objectives, progress }) {
  const entries = Object.entries(objectives).filter(([k]) => k !== 'clearBoard');

  return (
    <View style={styles.container}>
      {objectives.clearBoard && (
        <View style={styles.row}>
          <Text style={styles.emoji}>\uD83C\uDF0E</Text>
          <Text style={styles.label}>Clear the board!</Text>
        </View>
      )}
      {entries.map(([key, target]) => {
        const current = Math.min(progress[key] || 0, target);
        const done = current >= target;
        return (
          <View key={key} style={styles.row}>
            <Text style={styles.emoji}>{key === 'score' ? '\u2B50' : (TILE_EMOJIS[key] || '?')}</Text>
            <Text style={[styles.label, done && styles.done]}>
              {key === 'score' ? `${current.toLocaleString()} / ${target.toLocaleString()}` : `${current} / ${target}`}
            </Text>
            {done && <Text style={styles.check}>\u2713</Text>}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  emoji: { fontSize: 18, marginRight: 6 },
  label: { fontSize: 14, color: COLORS.textPrimary, fontWeight: '600' },
  done: { color: COLORS.buttonPrimary },
  check: { fontSize: 16, color: COLORS.buttonPrimary, marginLeft: 4 },
});
