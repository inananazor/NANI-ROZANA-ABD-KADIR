import React, { useState, useEffect } from 'react';
import { LEVEL_4_ROUNDS } from '../../data/gameContent';
import { HandTrackingPoint, InputMode, Difficulty, VocabWord } from '../../types/game';
import { LevelHeader } from '../LevelHeader';
import { sounds } from '../../utils/audio';
import { shuffleArray } from '../../utils/shuffle';
import confetti from 'canvas-confetti';
import { CheckCircle2, ArrowRight, Lightbulb, Sparkles, AlertTriangle } from 'lucide-react';

interface Level4VocabCatcherProps {
  score: number;
  streak: number;
  difficulty: Difficulty;
  inputMode: InputMode;
  handPoint: HandTrackingPoint | null;
  onAnswerCorrect: (points: number) => void;
  onAnswerIncorrect: () => void;
  onLevelComplete: () => void;
  onOpenGuide: () => void;
}

export const Level4VocabCatcher: React.FC<Level4VocabCatcherProps> = ({
  score,
  streak,
  difficulty,
  inputMode,
  handPoint,
  onAnswerCorrect,
  onAnswerIncorrect,
  onLevelComplete,
  onOpenGuide
}) => {
  const [roundIdx, setRoundIdx] = useState(0);
  const [caughtWords, setCaughtWords] = useState<VocabWord[]>([]);
  const [remainingWords, setRemainingWords] = useState<VocabWord[]>([]);
  const [hoveredWordId, setHoveredWordId] = useState<string | null>(null);
  const [lastFeedback, setLastFeedback] = useState<{ word: string; isCorrect: boolean; msg: string } | null>(null);
  const [isRoundWon, setIsRoundWon] = useState(false);
  const [wasPinching, setWasPinching] = useState(false);

  const currentRound = LEVEL_4_ROUNDS[roundIdx];

  useEffect(() => {
    // Shuffle words for the round
    const shuffled = shuffleArray(currentRound.words);
    setRemainingWords(shuffled);
    setCaughtWords([]);
    setLastFeedback(null);
    setIsRoundWon(false);
  }, [roundIdx, currentRound]);

  // Hand tracking pinch interaction
  useEffect(() => {
    if (inputMode !== 'hand' || !handPoint || !handPoint.detected || isRoundWon) {
      setWasPinching(false);
      return;
    }

    const screenX = handPoint.x * window.innerWidth;
    const screenY = handPoint.y * window.innerHeight;

    const elem = document.elementFromPoint(screenX, screenY);
    const wordElem = elem?.closest('[data-vocab-id]') as HTMLElement | null;
    const vocabId = wordElem ? wordElem.getAttribute('data-vocab-id') : null;

    setHoveredWordId(vocabId);

    // If pinched down on a word
    if (handPoint.isPinching && !wasPinching && vocabId) {
      handleCatchWord(vocabId);
    }

    setWasPinching(handPoint.isPinching);
  }, [handPoint, inputMode, isRoundWon, wasPinching, remainingWords, caughtWords]);

  const handleCatchWord = (vocabId: string) => {
    if (isRoundWon) return;
    const word = remainingWords.find(w => w.id === vocabId);
    if (!word) return;

    if (word.isReviewWord) {
      sounds.playCorrect();
      const updatedCaught = [...caughtWords, word];
      setCaughtWords(updatedCaught);
      setRemainingWords(prev => prev.filter(w => w.id !== vocabId));
      setLastFeedback({
        word: word.word,
        isCorrect: true,
        msg: `"${word.word}": ${word.definition} e.g. "${word.example}"`
      });

      if (updatedCaught.length === currentRound.targetCount) {
        setIsRoundWon(true);
        sounds.playLevelComplete();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
        const pts = difficulty === 'hard' ? 15 : 10;
        onAnswerCorrect(pts);
      }
    } else {
      sounds.playIncorrect();
      onAnswerIncorrect();
      setLastFeedback({
        word: word.word,
        isCorrect: false,
        msg: `"${word.word}" is too basic/vague for CEFR B2! ${word.example}`
      });
    }
  };

  const handleNext = () => {
    sounds.playGrab();
    if (roundIdx + 1 < LEVEL_4_ROUNDS.length) {
      setRoundIdx(prev => prev + 1);
    } else {
      sounds.playLevelComplete();
      onLevelComplete();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-2 flex flex-col items-center">
      <LevelHeader
        levelNumber={4}
        levelTitle="Vocabulary Catcher"
        questionIndex={roundIdx}
        totalQuestions={LEVEL_4_ROUNDS.length}
        score={score}
        streak={streak}
        difficulty={difficulty}
        instruction={currentRound.instruction}
        onOpenGuide={onOpenGuide}
      />

      {/* Theme Header & Target Goal */}
      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-4 shadow-xl backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase font-bold text-cyan-400 font-mono">
            Theme:
          </span>
          <span className="text-sm font-semibold text-white">
            {currentRound.theme}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Target: Catch</span>
          <span className="font-mono font-bold text-cyan-300">
            {caughtWords.length} / {currentRound.targetCount}
          </span>
          <span className="text-slate-400">review words</span>
        </div>
      </div>

      {/* Floating 3D Vocabulary Arena */}
      <div className="w-full relative min-h-[260px] bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 mb-5 overflow-hidden backdrop-blur-md shadow-2xl flex flex-wrap items-center justify-center gap-4">
        {remainingWords.map((item, idx) => {
          const isHovered = hoveredWordId === item.id;
          // Floating offset animation variation
          const animDelay = (idx * 0.4) % 2;

          return (
            <div
              key={item.id}
              data-vocab-id={item.id}
              onClick={() => handleCatchWord(item.id)}
              style={{
                animation: `pulseTarget 4s infinite ease-in-out ${animDelay}s`
              }}
              className={`px-5 py-3 rounded-2xl border-2 font-semibold text-sm cursor-pointer select-none transition-all duration-200 shadow-xl card-3d-tilt ${
                isHovered
                  ? 'border-cyan-400 bg-cyan-500/30 text-white shadow-[0_0_25px_rgba(6,182,212,0.6)] transform -translate-y-2 scale-110'
                  : 'border-slate-700/80 bg-slate-800/90 text-slate-200 hover:border-cyan-500/60'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{item.word}</span>
                <span className="text-xs opacity-60">✨</span>
              </div>
            </div>
          );
        })}

        {remainingWords.length === 0 && !isRoundWon && (
          <div className="text-slate-500 text-sm">All words examined!</div>
        )}
      </div>

      {/* Real-time Feedback Banner */}
      {lastFeedback && (
        <div className={`w-full p-3.5 rounded-xl border mb-4 text-xs flex items-start gap-3 backdrop-blur-md transition-all duration-150 ${
          lastFeedback.isCorrect
            ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
            : 'bg-rose-950/40 border-rose-500/60 text-rose-200'
        }`}>
          {lastFeedback.isCorrect ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          )}
          <div>
            <div className="font-bold mb-0.5">
              {lastFeedback.isCorrect ? 'Stellar Review Vocabulary!' : 'Weak or Filler Word!'}
            </div>
            <p className="leading-relaxed">{lastFeedback.msg}</p>
          </div>
        </div>
      )}

      {/* Caught Vocabulary Basket */}
      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md mb-4">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="font-mono uppercase font-semibold text-cyan-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Caught Review Vocabulary Basket ({caughtWords.length} / {currentRound.targetCount})
          </span>
          <span className="text-[11px] text-slate-500">
            {isRoundWon ? 'All Target Words Caught!' : 'Pinch floating words to catch them'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 min-h-[44px] items-center">
          {caughtWords.length === 0 ? (
            <span className="text-slate-500 text-xs italic py-1">
              Your basket is empty. Pinch floating review words above!
            </span>
          ) : (
            caughtWords.map((w) => (
              <div
                key={w.id}
                className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 font-semibold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <span>✓ {w.word}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Round Won Victory Card */}
      {isRoundWon && (
        <div className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl backdrop-blur-md animate-in fade-in duration-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Round Mastered! (+{difficulty === 'hard' ? 15 : 10} pts)
              </h3>
              <p className="text-xs text-slate-300">
                You successfully caught all required CEFR B1–B2 review vocabulary!
              </p>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>{roundIdx + 1 === LEVEL_4_ROUNDS.length ? 'Finish Level 4' : 'Next Vocabulary Round'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
