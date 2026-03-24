import { Animated, Easing } from 'react-native';

/**
 * Looping glow/pulse animation for selected tile.
 */
export function startGlowAnimation(animValue) {
  const anim = Animated.loop(
    Animated.sequence([
      Animated.timing(animValue, { toValue: 1, duration: 500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
      Animated.timing(animValue, { toValue: 0.4, duration: 500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
    ])
  );
  anim.start();
  return anim;
}

/**
 * Spring-based swap animation.
 */
export function animateSwap(animValue, toValue, callback) {
  Animated.spring(animValue, {
    toValue,
    useNativeDriver: true,
    friction: 8,
    tension: 60,
  }).start(callback);
}

/**
 * Scale + fade out destroy animation.
 */
export function animateDestroy(scale, opacity, callback) {
  Animated.parallel([
    Animated.timing(scale, { toValue: 1.4, duration: 160, useNativeDriver: true }),
    Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
  ]).start(callback);
}

/**
 * Falling tile animation with bounce.
 */
export function animateFall(translateY, targetY, callback) {
  Animated.timing(translateY, {
    toValue: targetY,
    duration: 320,
    easing: Easing.out(Easing.bounce),
    useNativeDriver: true,
  }).start(callback);
}

/**
 * Power-up activation animation (scale pulse).
 */
export function animatePowerUp(scale, callback) {
  Animated.sequence([
    Animated.timing(scale, { toValue: 1.5, duration: 120, useNativeDriver: true }),
    Animated.timing(scale, { toValue: 0, duration: 200, useNativeDriver: true }),
  ]).start(callback);
}

/**
 * Button press scale animation.
 */
export function animateButtonPress(scale) {
  Animated.sequence([
    Animated.spring(scale, { toValue: 0.92, useNativeDriver: true, friction: 4 }),
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 4 }),
  ]).start();
}

/**
 * Modal slide-up entrance.
 */
export function animateModalIn(opacity, translateY, callback) {
  Animated.parallel([
    Animated.timing(opacity, { toValue: 1, duration: 280, useNativeDriver: true }),
    Animated.spring(translateY, { toValue: 0, useNativeDriver: true, friction: 8, tension: 50 }),
  ]).start(callback);
}

/**
 * Star earn animation (scale up then settle).
 */
export function animateStarEarn(scale, callback) {
  Animated.sequence([
    Animated.spring(scale, { toValue: 1.6, useNativeDriver: true, friction: 3 }),
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 5 }),
  ]).start(callback);
}
