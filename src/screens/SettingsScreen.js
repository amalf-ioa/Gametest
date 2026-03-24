import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useGame } from '../context/GameContext';
import AudioManager from '../services/AudioManager';

export default function SettingsScreen({ navigation }) {
  const { state, dispatch } = useGame();
  const { settings } = state;

  const updateSetting = (key, value) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { [key]: value } });
    if (key === 'musicEnabled') {
      AudioManager.setEnabled(value);
      if (!value) AudioManager.stopMusic();
    }
    if (key === 'musicVolume') AudioManager.setMusicVolume(value);
    if (key === 'sfxVolume') AudioManager.setSfxVolume(value);
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Progress',
      'This will erase ALL your progress. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: () => dispatch({ type: 'RESET' }) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>\u2190 Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Audio */}
        <Text style={styles.sectionTitle}>Audio</Text>
        <SettingRow label="\uD83C\uDFB5  Music" right={
          <Switch value={settings.musicEnabled} onValueChange={v => updateSetting('musicEnabled', v)} trackColor={{ true: '#4CAF50' }} />
        } />
        <SettingRow label="\uD83D\uDD0A  SFX" right={
          <Switch value={settings.sfxEnabled} onValueChange={v => updateSetting('sfxEnabled', v)} trackColor={{ true: '#4CAF50' }} />
        } />

        {/* Gameplay */}
        <Text style={styles.sectionTitle}>Gameplay</Text>
        <SettingRow label="\uD83D\uDCF3  Vibration" right={
          <Switch value={settings.vibrationEnabled} onValueChange={v => updateSetting('vibrationEnabled', v)} trackColor={{ true: '#4CAF50' }} />
        } />

        {/* Info */}
        <Text style={styles.sectionTitle}>About</Text>
        <SettingRow label="\uD83C\uDFAE  Version" right={<Text style={styles.value}>1.0.0</Text>} />
        <SettingRow label="\u2B50  Total Stars" right={<Text style={styles.value}>{state.totalStarsEarned}</Text>} />
        <SettingRow label="\uD83C\uDFAF  Highest Level" right={<Text style={styles.value}>{state.highestLevelUnlocked}</Text>} />

        {/* Danger zone */}
        <Text style={styles.sectionTitle}>Data</Text>
        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.resetText}>\uD83D\uDDD1\uFE0F  Reset All Progress</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingRow({ label, right }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFACD' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, backgroundColor: '#87CEEB' },
  backBtn: { padding: 4 },
  backText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', color: '#999', letterSpacing: 1, marginTop: 22, marginBottom: 8, textTransform: 'uppercase' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 2, elevation: 2 },
  label: { fontSize: 16, color: '#333' },
  value: { fontSize: 16, color: '#666', fontWeight: '600' },
  resetBtn: { backgroundColor: '#FFEBEE', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  resetText: { color: '#F44336', fontSize: 16, fontWeight: 'bold' },
});
