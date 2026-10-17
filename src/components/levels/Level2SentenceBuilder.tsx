import React, { useState, useEffect } from 'react';
import { LEVEL_2_QUESTIONS } from '../../data/gameContent';
import { HandTrackingPoint, InputMode, Difficulty } from '../../types/game';
import { LevelHeader } from '../LevelHeader';
import { sounds } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { CheckCircle2, RotateCcw, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';

interface Level2SentenceBuilderProps {
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

interface FloatingWordItem {
  id: string;
  word: string;
  originalIndex: number;
  isPlaced: boolean;
}

export const Level2SentenceBuilder: React.FC<Level2SentenceBuilderProps> = ({
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
  const [availableWords, setAvailableWords] = useState<FloatingWordItem[]>([]);
  const [assembledWords, setAssembledWords] = useState<FloatingWordItem[]>([]);
  const [hoveredWordId, setHoveredWordId] = useState<string | null>(null);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [wasPinching, setWasPinching] = useState(false);

  const currentQ = LEVEL_2_QUESTIONS[questionIdx];

  // Initialize randomized words when question changes
  useEffect(() => {
    const randomized = [...currentQ.words]
      .sort(() => Math.random() - 0.5)
      .map((word, idx) => ({
        id: `word-${questionIdx}-${idx}-${word}`,
        word,
        originalIndex: idx,
        isPlaced: false
      }));
    setAvailableWords(randomized);
    setAssembledWords([]);
    setIsEvaluated(false);
    setIsCorrect(false);
    setHoveredWordId(null);
  }, [questionIdx]);

  // Hand tracking pinch interaction
  useEffect(() => {
    if (inputMode !== 'hand' || !handPoint || !handPoint.detected || isEvaluated) {
      setWasPinching(false);
      return;
    }

    const screenX = handPoint.x * window.innerWidth;
    const screenY = handPoint.y * window.innerHeight;

    // Detect word element under cursor
    const element = document.elementFromPoint(screenX, screenY);
    const wordElement = element?.closest('[data-word-id]') as HTMLElement | null;
    const wordId = wordElement ? wordElement.getAttribute('data-word-id') : null;

    setHoveredWordId(wordId);

    // If pinched down on a word
    if (handPoint.isPinching && !wasPinching && wordId) {
      handleWordAction(wordId);
    }

    setWasPinching(handPoint.isPinching);
  }, [handPoint, inputMode, isEvaluated, wasPinching, availableWords, assembledWords]);

  const handleWordAction = (wordId: string) => {
    if (isEvaluated) return;

    // Is it in available pool?
    const inAvailable = availableWords.find(w => w.id === wordId);
    if (inAvailable) {
      sounds.playGrab();
      setAvailableWords(prev => prev.filter(w => w.id !== wordId));
      setAssembledWords(prev => [...prev, inAvailable]);
      return;
    }

    // Is it in assembled sentence?
    const inAssembled = assembledWords.find(w => w.id === wordId);
    if (inAssembled) {
      sounds.playDrop();
      setAssembledWords(prev => prev.filter(w => w.id !== wordId));
      setAvailableWords(prev => [...prev, inAssembled]);
    }
  };

  const handleReset = () => {
    sounds.playDrop();
    const all = [...availableWords, ...assembledWords];
    setAvailableWords(all.sort(() => Math.random() - 0.5));
    setAssembledWords([]);
    setIsEvaluated(false);
  };

  const handleUndo = () => {
    if (assembledWords.length === 0 || isEvaluated) return;
    sounds.playDrop();
    const lastWord = assembledWords[assembledWords.length - 1];
    setAssembledWords(prev => prev.slice(0, prev.length - 1));
    setAvailableWords(prev => [...prev, lastWord]);
  };

  const handleCheckSentence = () => {
    if (assembledWords.length === 0) return;
    const userSentence = assembledWords.map(w => w.word).join(' ');
    const targetSentence = currentQ.correctOrder.join(' ');

    const correct = userSentence === targetSentence;
    setIsEvaluated(true);
    setIsCorrect(correct);

    if (correct) {
      sounds.playCorrect();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
      const pts = difficulty === 'hard' ? 15 : 10;
      onAnswerCorrect(pts);
    } else {
      sounds.playIncorrect();
      onAnswerIncorrect();
    }
  };

  const handleNext = () => {
    sounds.playGrab();
    if (questionIdx + 1 < LEVEL_2_QUESTIONS.length) {
      setQuestionIdx(prev => prev + 1);
    } else {
      sounds.playLevelComplete();
      onLevelComplete();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-2 flex flex-col items-center">
      <LevelHeader
        levelNumber={2}
        levelTitle="Sentence Builder"
        questionIndex={questionIdx}
        totalQuestions={LEVEL_2_QUESTIONS.length}
        score={score}
        streak={streak}
        difficulty={difficulty}
        instruction="Pinch and arrange floating words into an idiomatic B1–B2 review sentence!"
        onOpenGuide={onOpenGuide}
      />

      {/* Target Category Header */}
      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-5 shadow-xl backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase font-bold text-cyan-400 font-mono">
            Topic:
          </span>
          <span className="text-sm font-semibold text-white">
            {currentQ.topic}
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-xs text-indigo-300 font-medium px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30">
            {currentQ.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={assembledWords.length === 0 || isEvaluated}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-lg text-xs font-medium transition-colors border border-slate-700 cursor-pointer"
          >
            Undo Last
          </button>
          <button
            onClick={handleReset}
            disabled={assembledWords.length === 0 || isEvaluated}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-lg text-xs font-medium transition-colors border border-slate-700 flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Clear
          </button>
        </div>
      </div>

      {/* Sentence Construction Drop Area */}
      <div
        className={`w-full min-h-[140px] rounded-2xl p-5 mb-6 border-2 transition-all duration-200 flex flex-col justify-between ${
          isEvaluated
            ? isCorrect
              ? 'border-emerald-500 bg-emerald-950/30 shadow-[0_0_30px_rgba(16,185,129,0.3)]'
              : 'border-rose-500 bg-rose-950/30 shadow-[0_0_25px_rgba(244,63,94,0.3)]'
            : assembledWords.length > 0
            ? 'border-cyan-500/60 bg-slate-900/90 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
            : 'border-dashed border-slate-700/80 bg-slate-900/50'
        }`}
      >
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
            <span className="font-semibold uppercase tracking-wider font-mono text-cyan-400">
              Sentence Workbench ({assembledWords.length} / {currentQ.correctOrder.length} words placed)
            </span>
            <span className="text-[11px] text-slate-500">
              Pinch words in sequence to assemble
            </span>
          </div>

          {/* Assembled Words Strip */}
          <div className="flex flex-wrap items-center gap-2.5 min-h-[50px]">
            {assembledWords.length === 0 ? (
              <span className="text-slate-500 text-xs italic select-none py-2">
                Pinch words from below to construct your review sentence here...
              </span>
            ) : (
              assembledWords.map((item, idx) => {
                const isHovered = hoveredWordId === item.id;
                return (
                  <div
                    key={item.id}
                    data-word-id={item.id}
                    onClick={() => handleWordAction(item.id)}
                    className={`px-3.5 py-1.5 rounded-xl border font-medium text-xs sm:text-sm cursor-pointer transition-all duration-150 flex items-center gap-1.5 select-none shadow-md ${
                      isHovered && !isEvaluated
                        ? 'bg-rose-500/20 border-rose-400 text-rose-200 transform scale-105'
                        : 'bg-cyan-500/20 border-cyan-400/50 text-cyan-100 hover:border-rose-400'
                    }`}
                  >
                    <span>{item.word}</span>
                    {!isEvaluated && <span className="text-[10px] text-slate-400">✕</span>}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Check Sentence Button */}
        {!isEvaluated && (
          <div className="flex justify-end pt-3">
            <button
              onClick={handleCheckSentence}
              disabled={assembledWords.length < currentQ.correctOrder.length}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-all shadow-lg cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Verify Sentence Order</span>
            </button>
          </div>
        )}
      </div>

      {/* Floating Available Words Pool */}
      {!isEvaluated && (
        <div className="w-full bg-slate-900/70 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-lg perspective-1000 mb-6">
          <div className="text-xs text-slate-400 uppercase font-mono tracking-wider font-semibold mb-4">
            Available Floating Vocabulary Blocks:
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {availableWords.map((item) => {
              const isHovered = hoveredWordId === item.id;
              return (
                <div
                  key={item.id}
                  data-word-id={item.id}
                  onClick={() => handleWordAction(item.id)}
                  className={`px-4 py-2 rounded-xl border font-medium text-sm cursor-pointer select-none transition-all duration-200 transform-style-3d card-3d-tilt shadow-md ${
                    isHovered
                      ? 'border-cyan-400 bg-cyan-500/30 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] transform -translate-y-1 scale-105'
                      : 'border-slate-700 bg-slate-800/90 text-slate-200 hover:border-slate-600'
                  }`}
                >
                  <span className="font-semibold">{item.word}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Immediate Educational Explanation */}
      {isEvaluated && (
        <div className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl backdrop-blur-md animate-in fade-in duration-200 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl mt-0.5 ${
                isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}>
                {isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <RotateCcw className="w-6 h-6" />}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>
                    {isCorrect
                      ? 'Flawless Sentence Construction! (+10 pts)'
                      : 'Not quite the natural review order!'}
                  </span>
                </h3>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                  <span className="text-slate-400 font-sans block mb-1">Target Sentence:</span>
                  &ldquo;{currentQ.fullSentence}&rdquo;
                </div>

                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300">SPM Writing Tip:</strong> {currentQ.tip}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>{questionIdx + 1 === LEVEL_2_QUESTIONS.length ? 'Finish Level 2' : 'Next Sentence'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
