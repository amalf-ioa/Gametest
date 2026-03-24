import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useGame } from '../context/GameContext';
import { RENOVATION_AREAS } from '../data/renovationAreas';
import { CHARACTERS } from '../data/characters';
import DialogueBox from '../components/DialogueBox';

export default function RenovationScreen({ route, navigation }) {
  const areaId = route.params?.areaId || 'entryGarden';
  const area = RENOVATION_AREAS[areaId];
  const { state, dispatch, spendStars } = useGame();
  const areaProgress = state.renovationProgress[areaId] || { tasksComplete: [], selectedOptions: {} };

  const [modalTask, setModalTask] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showDialogue, setShowDialogue] = useState(true);

  const luna = CHARACTERS.luna;
  const dialogueText = areaProgress.tasksComplete.length === 0
    ? luna.dialogues.renovation[0]
    : areaProgress.tasksComplete.length >= area.tasks.length
      ? 'Amazing! This area is complete!'
      : luna.dialogues.renovation[Math.min(areaProgress.tasksComplete.length, luna.dialogues.renovation.length - 1)];

  const isTaskUnlocked = (task) => {
    if (!task.requiredTaskId) return true;
    return areaProgress.tasksComplete.includes(task.requiredTaskId);
  };

  const handleTaskPress = (task) => {
    if (!isTaskUnlocked(task)) { Alert.alert('Locked', 'Complete the previous task first!'); return; }
    if (areaProgress.tasksComplete.includes(task.id)) return;
    setModalTask(task);
    setSelectedOption(null);
  };

  const handlePurchase = () => {
    if (!selectedOption || !modalTask) return;
    if (state.totalStarsEarned < modalTask.starCost) {
      Alert.alert('Not enough stars', `You need ${modalTask.starCost} stars to complete this task.`);
      return;
    }
    const spent = spendStars(modalTask.starCost);
    if (spent) {
      dispatch({ type: 'COMPLETE_RENOVATION_TASK', payload: { areaId, taskId: modalTask.id, optionId: selectedOption } });
      setModalTask(null);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>\u2190 Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{area.name}</Text>
          <Text style={styles.stars}>\u2B50 {state.totalStarsEarned}</Text>
        </View>

        {/* Dialogue */}
        {showDialogue && (
          <DialogueBox character={luna} text={dialogueText} onClose={() => setShowDialogue(false)} />
        )}

        {/* Tasks */}
        <ScrollView style={styles.taskList} contentContainerStyle={styles.taskContent}>
          {area.tasks.map((task, idx) => {
            const done = areaProgress.tasksComplete.includes(task.id);
            const unlocked = isTaskUnlocked(task);
            const chosenOption = areaProgress.selectedOptions[task.id];
            const optionObj = task.options.find(o => o.id === chosenOption);

            return (
              <TouchableOpacity
                key={task.id}
                style={[styles.taskCard, done && styles.taskDone, !unlocked && styles.taskLocked]}
                onPress={() => handleTaskPress(task)}
                activeOpacity={unlocked && !done ? 0.8 : 1}
              >
                <View style={styles.taskRow}>
                  <Text style={styles.taskEmoji}>{done ? (optionObj?.emoji || '\u2705') : (!unlocked ? '\uD83D\uDD12' : '\uD83D\uDEE0\uFE0F')}</Text>
                  <View style={styles.taskInfo}>
                    <Text style={[styles.taskName, !unlocked && styles.taskNameLocked]}>{task.name}</Text>
                    <Text style={styles.taskDesc}>{done ? `Chosen: ${optionObj?.name || ''}` : task.description}</Text>
                  </View>
                  <View style={styles.costBadge}>
                    {!done && <Text style={styles.costText}>\u2B50 {task.starCost}</Text>}
                    {done && <Text style={styles.doneText}>Done!</Text>}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Option selection modal */}
      <Modal transparent visible={!!modalTask} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{modalTask?.name}</Text>
            <Text style={styles.modalCost}>Cost: \u2B50 {modalTask?.starCost}  |  You have: \u2B50 {state.totalStarsEarned}</Text>
            {modalTask?.options.map(opt => (
              <TouchableOpacity
                key={opt.id}
                style={[styles.optionBtn, selectedOption === opt.id && styles.optionSelected]}
                onPress={() => setSelectedOption(opt.id)}
              >
                <Text style={styles.optEmoji}>{opt.emoji}</Text>
                <View>
                  <Text style={styles.optName}>{opt.name}</Text>
                  <Text style={styles.optDesc}>{opt.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.buyBtn, !selectedOption && styles.buyBtnDisabled]}
              onPress={handlePurchase}
              disabled={!selectedOption}
            >
              <Text style={styles.buyText}>Confirm \u2714</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalTask(null)} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFACD' },
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, backgroundColor: '#87CEEB' },
  backBtn: { padding: 4 },
  backText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  stars: { fontSize: 16, color: '#FFD700', fontWeight: 'bold' },
  taskList: { flex: 1, marginTop: 8 },
  taskContent: { paddingHorizontal: 16, paddingBottom: 20 },
  taskCard: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  taskDone: { backgroundColor: '#E8F5E9', borderLeftWidth: 4, borderLeftColor: '#4CAF50' },
  taskLocked: { opacity: 0.55 },
  taskRow: { flexDirection: 'row', alignItems: 'center' },
  taskEmoji: { fontSize: 32, marginRight: 12 },
  taskInfo: { flex: 1 },
  taskName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  taskNameLocked: { color: '#999' },
  taskDesc: { fontSize: 13, color: '#777', marginTop: 3 },
  costBadge: { alignItems: 'center', justifyContent: 'center', minWidth: 50 },
  costText: { fontSize: 14, fontWeight: 'bold', color: '#FF9800' },
  doneText: { fontSize: 13, color: '#4CAF50', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'flex-end' },
  modalBox: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 6 },
  modalCost: { fontSize: 14, color: '#888', marginBottom: 16 },
  optionBtn: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, borderWidth: 2, borderColor: '#eee', marginBottom: 10 },
  optionSelected: { borderColor: '#4CAF50', backgroundColor: '#E8F5E9' },
  optEmoji: { fontSize: 32, marginRight: 14 },
  optName: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  optDesc: { fontSize: 12, color: '#888', marginTop: 2 },
  buyBtn: { backgroundColor: '#4CAF50', paddingVertical: 14, borderRadius: 26, alignItems: 'center', marginTop: 8 },
  buyBtnDisabled: { backgroundColor: '#ccc' },
  buyText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cancelBtn: { paddingVertical: 12, alignItems: 'center' },
  cancelText: { color: '#888', fontSize: 15 },
});
