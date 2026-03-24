import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useGame } from '../context/GameContext';
import GameBoard from '../components/GameBoard';
import ObjectiveTracker from '../components/ObjectiveTracker';
import PowerUpButton from '../components/PowerUpButton';
import LevelCompleteModal from '../components/modals/LevelCompleteModal';
import LevelFailedModal from '../components/modals/LevelFailedModal';
import { getLevel } from '../data/levels';
import { calculateStars } from '../game/ScoreCalculator';
import AdService from '../services/AdService';
import IAPService from '../services/IAPService';

export default function GameBoardScreen({ route, navigation }) {
  const { levelId } = route.params;
  const level = getLevel(levelId);
  const { state, dispatch, completeLevel, failLevel } = useGame();

  const [score, setScore] = useState(0);
  const [movesLeft, setMovesLeft] = useState(level.moves);
  const [objectiveProgress, setObjectiveProgress] = useState({});
  const [showComplete, setShowComplete] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [earnedStars, setEarnedStars] = useState(0);
  const [activeBooster, setActiveBooster] = useState(null);

  const handleLevelComplete = useCallback((s) => {
    const stars = calculateStars(s, level.starThresholds);
    setFinalScore(s);
    setEarnedStars(stars);
    completeLevel(levelId, stars, s);
    setShowComplete(true);
  }, [level, levelId, completeLevel]);

  const handleLevelFail = useCallback(() => {
    setShowFailed(true);
  }, []);

  const handleRetry = () => {
    if (state.livesRemaining <= 0) return;
    failLevel();
    setShowFailed(false);
    setScore(0);
    setMovesLeft(level.moves);
    setObjectiveProgress({});
  };

  const handleNext = () => {
    setShowComplete(false);
    const nextId = levelId + 1;
    navigation.replace('GameBoard', { levelId: nextId });
  };

  const handleWatchAd = async () => {
    const res = await AdService.showRewardedAd('5moves');
    if (res.success) {
      setShowFailed(false);
      setMovesLeft(prev => prev + 5);
    }
  };

  const handleBuyMoves = async () => {
    const res = await IAPService.purchaseItem('extra_moves_5', 0.99);
    if (res.success) {
      setShowFailed(false);
      setMovesLeft(prev => prev + 5);
    }
  };

  const handleBoosterPress = (type) => {
    if ((state.inventory[type] || 0) <= 0) return;
    setActiveBooster(activeBooster === type ? null : type);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>\u2190</Text>
          </TouchableOpacity>
          <Text style={styles.levelText}>Level {levelId}</Text>
          <View style={styles.movesBox}>
            <Text style={styles.movesLabel}>Moves</Text>
            <Text style={styles.movesNum}>{movesLeft}</Text>
          </View>
        </View>

        {/* Objectives */}
        <ObjectiveTracker objectives={level.objectives} progress={{ ...objectiveProgress, score }} />

        {/* Score */}
        <Text style={styles.score}>{score.toLocaleString()}</Text>

        {/* Board */}
        <GameBoard
          level={level}
          onScoreUpdate={setScore}
          onObjectiveUpdate={setObjectiveProgress}
          onLevelComplete={handleLevelComplete}
          onLevelFail={handleLevelFail}
          movesLeft={movesLeft}
          onMovesChange={setMovesLeft}
        />

        {/* Boosters */}
        <View style={styles.boosters}>
          <PowerUpButton type="rocket_h" count={state.inventory.rockets || 0} onPress={handleBoosterPress} disabled={showComplete || showFailed} />
          <PowerUpButton type="bomb"    count={state.inventory.bombs   || 0} onPress={handleBoosterPress} disabled={showComplete || showFailed} />
          <PowerUpButton type="rainbow" count={state.inventory.rainbows|| 0} onPress={handleBoosterPress} disabled={showComplete || showFailed} />
        </View>
      </View>

      <LevelCompleteModal
        visible={showComplete}
        stars={earnedStars}
        score={finalScore}
        onNext={handleNext}
        onMenu={() => { setShowComplete(false); navigation.navigate('MainMenu'); }}
      />
      <LevelFailedModal
        visible={showFailed}
        onRetry={handleRetry}
        onBuyMoves={handleBuyMoves}
        onWatchAd={handleWatchAd}
        onMenu={() => { setShowFailed(false); navigation.navigate('MainMenu'); }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFACD' },
  container: { flex: 1, alignItems: 'center' },
  topBar: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, backgroundColor: '#87CEEB' },
  backBtn: { padding: 6 },
  backText: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
  levelText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  movesBox: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 4 },
  movesLabel: { fontSize: 10, color: '#fff' },
  movesNum: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  score: { fontSize: 28, fontWeight: 'bold', color: '#FF6347', marginVertical: 6 },
  boosters: { flexDirection: 'row', justifyContent: 'center', marginTop: 14, paddingBottom: 10 },
});
