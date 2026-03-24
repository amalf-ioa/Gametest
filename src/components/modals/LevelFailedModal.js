import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AudioManager from '../../services/AudioManager';

export default function LevelFailedModal({ visible, onRetry, onBuyMoves, onWatchAd, onMenu }) {
  React.useEffect(() => {
    if (visible) AudioManager.playSound('levelFail');
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.emoji}>\uD83D\uDE22</Text>
          <Text style={styles.title}>Out of Moves!</Text>
          <Text style={styles.subtitle}>So close! You can do it!</Text>

          <TouchableOpacity style={[styles.btn, { backgroundColor: '#4CAF50' }]} onPress={onBuyMoves}>
            <Text style={styles.btnText}>+5 Moves  $0.99</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, { backgroundColor: '#2196F3' }]} onPress={onWatchAd}>
            <Text style={styles.btnText}>\uD83D\uDCFA  Watch Ad for +5 Moves</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.btn, { backgroundColor: '#FF9800' }]} onPress={onRetry}>
            <Text style={styles.btnText}>Try Again  (1 \u2665)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuBtn} onPress={onMenu}>
            <Text style={styles.menuText}>Main Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.65)', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: '#fff', borderRadius: 22, padding: 28, width: '84%', alignItems: 'center' },
  emoji: { fontSize: 52, marginBottom: 8 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#F44336', marginBottom: 6 },
  subtitle: { fontSize: 15, color: '#888', marginBottom: 22 },
  btn: { paddingVertical: 14, borderRadius: 26, marginBottom: 10, width: '100%', alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  menuBtn: { paddingVertical: 8, marginTop: 4 },
  menuText: { color: '#888', fontSize: 14 },
});
