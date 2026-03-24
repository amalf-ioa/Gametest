import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Tile from './Tile';
import { initializeBoard, swapTilesOnBoard, removeMatchedTiles, applyGravity, placePowerUp } from '../game/BoardManager';
import { detectMatches, areAdjacent, determinePowerUp } from '../game/MatchDetection';
import { activatePowerUp } from '../game/PowerUpSystem';
import { calculateMatchScore, calculatePowerUpScore } from '../game/ScoreCalculator';
import { checkObjectivesComplete } from '../utils/helpers';
import AudioManager from '../services/AudioManager';

const CASCADE_DELAY = 350;

export default function GameBoard({ level, onScoreUpdate, onObjectiveUpdate, onLevelComplete, onLevelFail, movesLeft, onMovesChange }) {
  const [board, setBoard] = useState([]);
  const [selected, setSelected] = useState(null); // { row, col }
  const [processing, setProcessing] = useState(false);
  const scoreRef = useRef(0);
  const objectivesRef = useRef({});
  const cascadeRef = useRef(0);

  // Init board when level changes
  useEffect(() => {
    const b = initializeBoard(level);
    setBoard(b);
    setSelected(null);
    scoreRef.current = 0;
    cascadeRef.current = 0;
    // Build objective progress tracking
    const prog = {};
    Object.keys(level.objectives).forEach(k => { prog[k] = 0; });
    objectivesRef.current = prog;
  }, [level]);

  const processMatches = useCallback(async (currentBoard, cascade = 0) => {
    const { matches, matchedSet } = detectMatches(currentBoard);
    if (matchedSet.size === 0) {
      setProcessing(false);
      cascadeRef.current = 0;
      // Check remaining moves
      if (movesLeft <= 0) onLevelFail();
      return;
    }

    AudioManager.playSound('match3');

    // Score
    const matchScore = calculateMatchScore(matches, cascade);
    scoreRef.current += matchScore;
    onScoreUpdate(scoreRef.current);

    // Update objective progress for tile types
    const newObjectives = { ...objectivesRef.current };
    const matchedPositions = Array.from(matchedSet).map(k => k.split(',').map(Number));
    matchedPositions.forEach(([r, c]) => {
      const tile = currentBoard[r][c];
      if (tile?.type && newObjectives[tile.type] !== undefined) {
        newObjectives[tile.type] = (newObjectives[tile.type] || 0) + 1;
      }
    });
    newObjectives.score = scoreRef.current;
    objectivesRef.current = newObjectives;
    onObjectiveUpdate(newObjectives);

    // Check power-up creation
    let boardAfterRemoval = removeMatchedTiles(currentBoard, matchedSet);
    matches.forEach(match => {
      if (match.length >= 4) {
        const pu = determinePowerUp(match, match.tiles[0].row, match.tiles[0].col);
        if (pu) {
          const type = currentBoard[match.tiles[0].row]?.[match.tiles[0].col]?.type || 'dogbone';
          boardAfterRemoval = placePowerUp(boardAfterRemoval, pu.row, pu.col, pu.type, type);
        }
      }
    });

    // Apply gravity
    const { board: newBoard } = applyGravity(boardAfterRemoval, level.tileTypes);
    setBoard(newBoard);

    // Check win condition
    if (checkObjectivesComplete(level.objectives, objectivesRef.current)) {
      setProcessing(false);
      onLevelComplete(scoreRef.current);
      return;
    }

    // Continue cascades
    setTimeout(() => processMatches(newBoard, cascade + 1), CASCADE_DELAY);
  }, [level, movesLeft, onScoreUpdate, onObjectiveUpdate, onLevelComplete, onLevelFail]);

  const handleTilePress = useCallback((row, col) => {
    if (processing) return;
    const tile = board[row]?.[col];
    if (!tile || tile.obstacle) return;

    if (!selected) {
      setSelected({ row, col });
      AudioManager.playSound('tileSelect');
      return;
    }

    if (selected.row === row && selected.col === col) {
      setSelected(null);
      return;
    }

    if (!areAdjacent(selected, { row, col })) {
      setSelected({ row, col });
      AudioManager.playSound('tileSelect');
      return;
    }

    // Attempt swap
    setSelected(null);
    setProcessing(true);
    AudioManager.playSound('tileSwap');

    const r1 = selected.row, c1 = selected.col;
    const swapped = swapTilesOnBoard(board, r1, c1, row, col);

    // Check if either tile is a power-up
    const t1 = board[r1][c1];
    const t2 = board[row][col];

    if (t1?.powerUp || t2?.powerUp) {
      // Activate the power-up
      const puRow = t1?.powerUp ? r1 : row;
      const puCol = t1?.powerUp ? c1 : col;
      const { affectedCells, score } = activatePowerUp(swapped, puRow, puCol);
      const puSet = new Set(affectedCells.map(({ row: r, col: c }) => `${r},${c}`));
      scoreRef.current += score;
      onScoreUpdate(scoreRef.current);
      const afterPU = removeMatchedTiles(swapped, puSet);
      const { board: fallen } = applyGravity(afterPU, level.tileTypes);
      setBoard(fallen);
      onMovesChange(movesLeft - 1);
      setTimeout(() => processMatches(fallen, 0), CASCADE_DELAY);
      return;
    }

    const { matchedSet } = detectMatches(swapped);

    if (matchedSet.size === 0) {
      // Revert
      setTimeout(() => {
        setBoard(board);
        setProcessing(false);
      }, 260);
      return;
    }

    setBoard(swapped);
    onMovesChange(movesLeft - 1);
    setTimeout(() => processMatches(swapped, 0), 80);
  }, [board, selected, processing, movesLeft, level, processMatches, onScoreUpdate, onMovesChange]);

  return (
    <View style={styles.board}>
      {board.map((row, rIdx) => (
        <View key={rIdx} style={styles.row}>
          {row.map((tile, cIdx) => (
            <Tile
              key={tile?.id || `${rIdx}-${cIdx}`}
              tile={tile}
              isSelected={selected?.row === rIdx && selected?.col === cIdx}
              onPress={() => handleTilePress(rIdx, cIdx)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    backgroundColor: '#D4E9FF',
    borderRadius: 14,
    padding: 6,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  row: { flexDirection: 'row' },
});
