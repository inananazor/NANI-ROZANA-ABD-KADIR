/**
 * Grab, Sort & Write!
 * 3D Hand-Tracking Educational Game for CEFR B1–B2 ESL Review Writing
 */

import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { WebcamHUD } from './components/WebcamHUD';
import { VirtualHandCursor } from './components/VirtualHandCursor';
import { ReviewGuideModal } from './components/ReviewGuideModal';
import { GameOverModal } from './components/GameOverModal';

import { Level1Detective } from './components/levels/Level1Detective';
import { Level2SentenceBuilder } from './components/levels/Level2SentenceBuilder';
import { Level3Structure } from './components/levels/Level3Structure';
import { Level4VocabCatcher } from './components/levels/Level4VocabCatcher';
import { Level5ReviewMaster } from './components/levels/Level5ReviewMaster';

import { Difficulty, InputMode, HandTrackingPoint } from './types/game';
import { handTracker } from './services/handTracker';
import { sounds } from './utils/audio';

export default function App() {
  const [gameState, setGameState] = useState<'welcome' | 'playing' | 'gameover'>('welcome');
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [highestStreak, setHighestStreak] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [inputMode, setInputMode] = useState<InputMode>('hand');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [handPoint, setHandPoint] = useState<HandTrackingPoint | null>(null);

  // Subscribe to real-time Hand Tracker updates
  useEffect(() => {
    const unsub = handTracker.onUpdate((point) => {
      setHandPoint(point);
    });
    return () => unsub();
  }, []);

  const handleStartGame = (mode: InputMode) => {
    setInputMode(mode);
    setGameState('playing');
    sounds.playGrab();
  };

  const handleAnswerCorrect = (points: number) => {
    setScore(prev => prev + points);
    setStreak(prev => {
      const next = prev + 1;
      if (next > highestStreak) {
        setHighestStreak(next);
      }
      return next;
    });
  };

  const handleAnswerIncorrect = () => {
    setStreak(0);
  };

  const handleLevelComplete = () => {
    if (currentLevel < 5) {
      setCurrentLevel(prev => prev + 1);
    } else {
      setGameState('gameover');
      sounds.playLevelComplete();
    }
  };

  const handleSelectLevel = (lvl: number) => {
    setCurrentLevel(lvl);
    setGameState('playing');
  };

  const handlePlayAgain = () => {
    setScore(0);
    setStreak(0);
    setCurrentLevel(1);
    setGameState('playing');
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
    if (next) sounds.playPinch();
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col relative overflow-x-hidden">
      {/* Top Bar with Top Bar Contract */}
      <TopBar
        currentLevel={currentLevel}
        score={score}
        streak={streak}
        difficulty={difficulty}
        inputMode={inputMode}
        soundEnabled={soundEnabled}
        onSelectLevel={handleSelectLevel}
        onSetDifficulty={setDifficulty}
        onToggleInputMode={setInputMode}
        onToggleSound={handleToggleSound}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Game Stage */}
      <main className="flex-1 flex flex-col justify-center py-6 px-4 relative z-10">
        {gameState === 'welcome' && (
          <WelcomeScreen
            difficulty={difficulty}
            onSetDifficulty={setDifficulty}
            onStartGame={handleStartGame}
            onOpenGuide={() => setIsGuideOpen(true)}
          />
        )}

        {gameState === 'playing' && (
          <>
            {currentLevel === 1 && (
              <Level1Detective
                score={score}
                streak={streak}
                difficulty={difficulty}
                inputMode={inputMode}
                handPoint={handPoint}
                onAnswerCorrect={handleAnswerCorrect}
                onAnswerIncorrect={handleAnswerIncorrect}
                onLevelComplete={handleLevelComplete}
                onOpenGuide={() => setIsGuideOpen(true)}
              />
            )}

            {currentLevel === 2 && (
              <Level2SentenceBuilder
                score={score}
                streak={streak}
                difficulty={difficulty}
                inputMode={inputMode}
                handPoint={handPoint}
                onAnswerCorrect={handleAnswerCorrect}
                onAnswerIncorrect={handleAnswerIncorrect}
                onLevelComplete={handleLevelComplete}
                onOpenGuide={() => setIsGuideOpen(true)}
              />
            )}

            {currentLevel === 3 && (
              <Level3Structure
                score={score}
                streak={streak}
                difficulty={difficulty}
                inputMode={inputMode}
                handPoint={handPoint}
                onAnswerCorrect={handleAnswerCorrect}
                onAnswerIncorrect={handleAnswerIncorrect}
                onLevelComplete={handleLevelComplete}
                onOpenGuide={() => setIsGuideOpen(true)}
              />
            )}

            {currentLevel === 4 && (
              <Level4VocabCatcher
                score={score}
                streak={streak}
                difficulty={difficulty}
                inputMode={inputMode}
                handPoint={handPoint}
                onAnswerCorrect={handleAnswerCorrect}
                onAnswerIncorrect={handleAnswerIncorrect}
                onLevelComplete={handleLevelComplete}
                onOpenGuide={() => setIsGuideOpen(true)}
              />
            )}

            {currentLevel === 5 && (
              <Level5ReviewMaster
                score={score}
                streak={streak}
                difficulty={difficulty}
                inputMode={inputMode}
                handPoint={handPoint}
                onAnswerCorrect={handleAnswerCorrect}
                onAnswerIncorrect={handleAnswerIncorrect}
                onLevelComplete={handleLevelComplete}
                onOpenGuide={() => setIsGuideOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Floating Webcam HUD */}
      <WebcamHUD
        inputMode={inputMode}
        onToggleInputMode={setInputMode}
        handPoint={handPoint}
      />

      {/* Virtual Hand Cursor Overlay */}
      <VirtualHandCursor
        point={handPoint}
        active={inputMode === 'hand' && gameState === 'playing'}
      />

      {/* Educational Review Guide Modal */}
      <ReviewGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Game Over / Results Modal */}
      {gameState === 'gameover' && (
        <GameOverModal
          score={score}
          highestStreak={highestStreak}
          difficulty={difficulty}
          onPlayAgain={handlePlayAgain}
          onSelectLevel={handleSelectLevel}
          onOpenGuide={() => setIsGuideOpen(true)}
        />
      )}

      {/* Subtle Ambient Background Gradients */}
      <div className="fixed -bottom-40 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />
    </div>
  );
}
