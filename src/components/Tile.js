import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Animated, StyleSheet, Text, View } from 'react-native';
import { COLORS, TILE_SIZE, TILE_EMOJIS, POWER_UP_EMOJIS } from '../data/constants';

const Tile = React.memo(({ tile, onPress, isSelected }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;

  // Selection glow loop
  useEffect(() => {
    if (isSelected) {
      const anim = Animated.loop(
        Animated.sequence([
          Animated.timing(glowOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(glowOpacity, { toValue: 0.3, duration: 400, useNativeDriver: true }),
        ])
      );
      anim.start();
      return () => anim.stop();
    } else {
      glowOpacity.setValue(0);
    }
  }, [isSelected]);

  if (!tile) return <View style={styles.empty} />;

  if (tile.obstacle) {
    return (
      <View style={[styles.tile, styles.obstacle, { backgroundColor: COLORS.obstacle[tile.obstacle] || '#888' }]}>
        <Text style={styles.icon}>{obstacleEmoji(tile.obstacle, tile.hits)}</Text>
      </View>
    );
  }

  const bgColor = COLORS.tileColors[tile.type] || '#ccc';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <Animated.View
        style={[
          styles.tile,
          { backgroundColor: bgColor, transform: [{ scale }] },
          isSelected && styles.selected,
        ]}
      >
        {isSelected && (
          <Animated.View style={[styles.glow, { opacity: glowOpacity }]} />
        )}
        <Text style={styles.icon}>{TILE_EMOJIS[tile.type] || '?'}</Text>
        {tile.powerUp && (
          <Text style={styles.powerUpBadge}>{POWER_UP_EMOJIS[tile.powerUp] || '+'}</Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
});

function obstacleEmoji(type, hits) {
  if (type === 'stone') return '\uD83E\uDDF1';
  if (type === 'cage') return hits > 1 ? '\uD83D\uDD12' : '\uD83D\uDD13';
  if (type === 'ice') return '\u2744\uFE0F';
  return '\uD83D\uDCE6'; // box
}

const styles = StyleSheet.create({
  empty: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    margin: 2,
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: 10,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 3,
    elevation: 4,
  },
  obstacle: {
    opacity: 0.85,
  },
  selected: {
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  glow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
    backgroundColor: 'rgba(255,215,0,0.35)',
  },
  icon: {
    fontSize: 26,
  },
  powerUpBadge: {
    position: 'absolute',
    bottom: 1,
    right: 2,
    fontSize: 10,
  },
});

export default Tile;
