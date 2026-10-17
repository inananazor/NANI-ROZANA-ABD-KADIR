import React, { useState, useEffect } from 'react';
import { LEVEL_1_QUESTIONS } from '../../data/gameContent';
import { HandTrackingPoint, InputMode, Difficulty } from '../../types/game';
import { LevelHeader } from '../LevelHeader';
import { sounds } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';

interface Level1DetectiveProps {
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

export const Level1Detective: React.FC<Level1DetectiveProps> = ({
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
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [wasPinching, setWasPinching] = useState(false);

  const currentQ = LEVEL_1_QUESTIONS[questionIdx];

  // Hand tracking pinch selection logic
  useEffect(() => {
    if (inputMode !== 'hand' || !handPoint || !handPoint.detected || hasAnswered) {
      setWasPinching(false);
      return;
    }

    const screenX = handPoint.x * window.innerWidth;
    const screenY = handPoint.y * window.innerHeight;

    // Detect card under cursor
    const element = document.elementFromPoint(screenX, screenY);
    const cardElement = element?.closest('[data-option-idx]') as HTMLElement | null;
    const optIdx = cardElement ? parseInt(cardElement.getAttribute('data-option-idx') || '-1', 10) : null;

    setHoveredIdx(optIdx !== -1 ? optIdx : null);

    // Detect pinch release or pinch down
    if (handPoint.isPinching && !wasPinching && optIdx !== null && optIdx >= 0) {
      handleSelectOption(optIdx);
    }

    setWasPinching(handPoint.isPinching);
  }, [handPoint, inputMode, hasAnswered, wasPinching]);

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOptionIdx(idx);
    setHasAnswered(true);

    const isCorrect = currentQ.options[idx].isCorrect;
    if (isCorrect) {
      sounds.playCorrect();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
      const pts = difficulty === 'hard' ? 15 : 10;
      onAnswerCorrect(pts);
    } else {
      sounds.playIncorrect();
      onAnswerIncorrect();
    }
  };

  const handleNextQuestion = () => {
    sounds.playGrab();
    setSelectedOptionIdx(null);
    setHasAnswered(false);

    if (questionIdx + 1 < LEVEL_1_QUESTIONS.length) {
      setQuestionIdx(prev => prev + 1);
    } else {
      sounds.playLevelComplete();
      onLevelComplete();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-2 flex flex-col items-center">
      <LevelHeader
        levelNumber={1}
        levelTitle="Review Detective"
        questionIndex={questionIdx}
        totalQuestions={LEVEL_1_QUESTIONS.length}
        score={score}
        streak={streak}
        difficulty={difficulty}
        instruction="Find and pinch the most engaging review introduction among the 4 choices!"
        onOpenGuide={onOpenGuide}
      />

      {/* Target Topic & Technique Card */}
      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-5 mb-6 shadow-xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-cyan-400 font-mono">
              Topic:
            </span>
            <span className="text-sm font-semibold text-white">
              {currentQ.topic}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Target Technique: <strong>{currentQ.hookType}</strong></span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          {currentQ.pedagogicalTip}
        </p>
      </div>

      {/* 4 Interactive 3D Options Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 perspective-1000 mb-6">
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedOptionIdx === idx;
          const isHovered = hoveredIdx === idx;
          const isCorrect = opt.isCorrect;

          let cardStyle = 'border-slate-800 bg-slate-900/80 hover:border-slate-700 text-slate-200';
          if (isHovered && !hasAnswered) {
            cardStyle = 'border-cyan-400/80 bg-slate-850 shadow-[0_0_20px_rgba(6,182,212,0.3)] transform -translate-y-1 scale-[1.01]';
          }
          if (hasAnswered) {
            if (isCorrect) {
              cardStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-100 shadow-[0_0_25px_rgba(16,185,129,0.4)]';
            } else if (isSelected && !isCorrect) {
              cardStyle = 'border-rose-500 bg-rose-950/40 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.3)]';
            } else {
              cardStyle = 'border-slate-800/40 bg-slate-900/40 opacity-40 text-slate-400';
            }
          }

          return (
            <div
              key={idx}
              data-option-idx={idx}
              data-interactive-id={`option-${idx}`}
              onClick={() => handleSelectOption(idx)}
              className={`relative rounded-2xl p-5 border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[140px] transform-style-3d card-3d-tilt select-none ${cardStyle}`}
            >
              {/* Option Index Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="w-7 h-7 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center font-mono text-xs font-bold text-slate-300">
                  {String.fromCharCode(65 + idx)}
                </span>
                
                {hasAnswered && isCorrect && (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/40">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Engaging Hook (+10 pts)
                  </span>
                )}
                {hasAnswered && isSelected && !isCorrect && (
                  <span className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded-full border border-rose-500/40">
                    <XCircle className="w-3.5 h-3.5" />
                    Weak Hook
                  </span>
                )}
              </div>

              {/* Option Text */}
              <p className="text-sm font-medium leading-relaxed mb-2">
                &ldquo;{opt.text}&rdquo;
              </p>

              {/* Pinch Prompt indicator on hover */}
              {!hasAnswered && isHovered && (
                <div className="text-[11px] text-cyan-400 font-semibold flex items-center gap-1 pt-1">
                  <span>🤏 Pinch to select!</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Immediate Educational Explanation Card */}
      {hasAnswered && selectedOptionIdx !== null && (
        <div className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl backdrop-blur-md animate-in fade-in duration-200 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl mt-0.5 ${
                currentQ.options[selectedOptionIdx].isCorrect
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-rose-500/20 text-rose-400'
              }`}>
                {currentQ.options[selectedOptionIdx].isCorrect ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  <XCircle className="w-6 h-6" />
                )}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>
                    {currentQ.options[selectedOptionIdx].isCorrect
                      ? 'Spot on, Detective! That is a stellar introduction.'
                      : 'Not quite the most engaging introduction.'}
                  </span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentQ.options[selectedOptionIdx].explanation}
                </p>
                {!currentQ.options[selectedOptionIdx].isCorrect && (
                  <div className="mt-2 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300">Why the correct answer works:</strong>{' '}
                      {currentQ.options.find(o => o.isCorrect)?.explanation}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleNextQuestion}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>{questionIdx + 1 === LEVEL_1_QUESTIONS.length ? 'Finish Level 1' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
