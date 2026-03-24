import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('MainMenu');
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity, transform: [{ scale }] }}>
        <Text style={styles.emoji}>\uD83D\uDC3E</Text>
        <Text style={styles.title}>Pet Paradise</Text>
        <Text style={styles.subtitle}>Makeover</Text>
      </Animated.View>
      <Text style={styles.loading}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: { fontSize: 80, textAlign: 'center', marginBottom: 12 },
  title: { fontSize: 38, fontWeight: 'bold', color: '#fff', textAlign: 'center', textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 4 },
  subtitle: { fontSize: 26, fontWeight: '600', color: '#FFD700', textAlign: 'center', letterSpacing: 3, marginTop: 4 },
  loading: { position: 'absolute', bottom: 60, fontSize: 14, color: 'rgba(255,255,255,0.7)' },
});
