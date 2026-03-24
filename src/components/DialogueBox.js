import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function DialogueBox({ character, text, onClose }) {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.characterName}>{character?.name || 'Luna'}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
      <Text style={styles.avatar}>{character?.emoji || '\uD83D\uDC69'}</Text>
      {onClose && (
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeText}>\u2715</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  avatar: {
    fontSize: 40,
    marginRight: 8,
  },
  bubble: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
    marginRight: 8,
  },
  characterName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#FF69B4',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  closeBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    padding: 4,
  },
  closeText: { fontSize: 12, color: '#999' },
});
