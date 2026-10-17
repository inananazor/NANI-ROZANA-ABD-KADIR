import React, { useState, useEffect } from 'react';
import { LEVEL_5_CHALLENGES } from '../../data/gameContent';
import { HandTrackingPoint, InputMode, Difficulty, ReviewCandidate } from '../../types/game';
import { LevelHeader } from '../LevelHeader';
import { sounds } from '../../utils/audio';
import { shuffleArray } from '../../utils/shuffle';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, ArrowRight, Lightbulb, Sparkles, FileText } from 'lucide-react';

interface Level5ReviewMasterProps {
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

export const Level5ReviewMaster: React.FC<Level5ReviewMasterProps> = ({
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
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [shuffledCandidates, setShuffledCandidates] = useState<ReviewCandidate[]>([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [hoveredCandidateId, setHoveredCandidateId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [wasPinching, setWasPinching] = useState(false);

  const currentChallenge = LEVEL_5_CHALLENGES[challengeIdx];

  // Randomise the 4 candidate choices whenever a new challenge loads
  useEffect(() => {
    if (currentChallenge) {
      setShuffledCandidates(shuffleArray(currentChallenge.candidates));
    }
    setSelectedCandidateId(null);
    setHoveredCandidateId(null);
    setHasAnswered(false);
    setWasPinching(false);
  }, [challengeIdx, currentChallenge]);

  // Hand tracking pinch interaction
  useEffect(() => {
    if (inputMode !== 'hand' || !handPoint || !handPoint.detected || hasAnswered) {
      setWasPinching(false);
      return;
    }

    const screenX = handPoint.x * window.innerWidth;
    const screenY = handPoint.y * window.innerHeight;

    const elem = document.elementFromPoint(screenX, screenY);
    const candidateElem = elem?.closest('[data-candidate-id]') as HTMLElement | null;
    const candId = candidateElem ? candidateElem.getAttribute('data-candidate-id') : null;

    setHoveredCandidateId(candId);

    // If pinched down on candidate
    if (handPoint.isPinching && !wasPinching && candId) {
      handleSelectCandidate(candId);
    }

    setWasPinching(handPoint.isPinching);
  }, [handPoint, inputMode, hasAnswered, wasPinching, shuffledCandidates]);

  const handleSelectCandidate = (candidateId: string) => {
    if (hasAnswered) return;
    const cand = shuffledCandidates.find(c => c.id === candidateId);
    if (!cand) return;

    setSelectedCandidateId(candidateId);
    setHasAnswered(true);

    if (cand.isCorrect) {
      sounds.playCorrect();
      confetti({
        particleCount: 60,
        spread: 70,
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
    if (challengeIdx + 1 < LEVEL_5_CHALLENGES.length) {
      setChallengeIdx(prev => prev + 1);
    } else {
      sounds.playLevelComplete();
      onLevelComplete();
    }
  };

  const selectedCandidate = shuffledCandidates.find(c => c.id === selectedCandidateId);
  const correctCandidate = shuffledCandidates.find(c => c.isCorrect);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-2 flex flex-col items-center">
      <LevelHeader
        levelNumber={5}
        levelTitle="Review Master"
        questionIndex={challengeIdx}
        totalQuestions={LEVEL_5_CHALLENGES.length}
        score={score}
        streak={streak}
        difficulty={difficulty}
        instruction="Pinch the most logical and engaging sentence to complete this SPM review model!"
        onOpenGuide={onOpenGuide}
      />

      {/* Review Document Canvas */}
      <div className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl p-6 mb-5 shadow-2xl backdrop-blur-md relative overflow-hidden">
        {/* Document Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                {currentChallenge.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{currentChallenge.reviewType}</span>
                <span aria-hidden="true">·</span>
                <span>Missing: <strong className="text-amber-400">{currentChallenge.missingSection}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Target: Fill the {currentChallenge.missingSection}</span>
          </div>
        </div>

        {/* 4 Review Paragraph Sections */}
        <div className="space-y-3.5 text-xs sm:text-sm">
          {currentChallenge.paragraphs.map((p) => {
            if (p.isBlank) {
              return (
                <div
                  key={p.section}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 select-none ${
                    hasAnswered
                      ? selectedCandidate?.isCorrect
                        ? 'border-emerald-500 bg-emerald-950/40 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                        : 'border-rose-500 bg-rose-950/40 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                      : 'border-dashed border-amber-400/80 bg-amber-500/10 pulse-target text-amber-200'
                  }`}
                >
                  <div className="text-[11px] font-mono uppercase font-bold tracking-wider mb-1.5 flex items-center justify-between">
                    <span className="text-amber-400">
                      [Section: {p.section}]
                    </span>
                    <span className="text-slate-400 font-sans text-[10px]">
                      {hasAnswered ? 'Candidate Inserted' : 'MISSING SECTION - Choose from below'}
                    </span>
                  </div>

                  {hasAnswered && selectedCandidate ? (
                    <p className="leading-relaxed font-medium">
                      &ldquo;{selectedCandidate.text}&rdquo;
                    </p>
                  ) : (
                    <p className="text-amber-300/80 italic text-xs leading-relaxed">
                      Pinch one of the 4 candidate sentences below to complete this {currentChallenge.missingSection} logically!
                    </p>
                  )}
                </div>
              );
            }

            return (
              <div
                key={p.section}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 space-y-1"
              >
                <div className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                  {p.section}
                </div>
                <p className="leading-relaxed">
                  {p.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4 Floating Candidate Sentence Cards */}
      {!hasAnswered && (
        <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md shadow-xl mb-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
            <span className="font-mono uppercase font-semibold text-cyan-400">
              Candidate Sentences for {currentChallenge.missingSection}:
            </span>
            <span className="text-[11px] text-slate-500">
              Pinch or click to insert into the review
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 perspective-1000">
            {shuffledCandidates.map((cand, idx) => {
              const isHovered = hoveredCandidateId === cand.id;

              return (
                <div
                  key={cand.id}
                  data-candidate-id={cand.id}
                  onClick={() => handleSelectCandidate(cand.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none card-3d-tilt shadow-md flex flex-col justify-between ${
                    isHovered
                      ? 'border-cyan-400 bg-cyan-500/25 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] transform -translate-y-1 scale-102'
                      : 'border-slate-800 bg-slate-850 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-xs font-bold text-slate-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {isHovered && (
                      <span className="text-[10px] text-cyan-400 font-semibold">
                        🤏 Pinch to insert
                      </span>
                    )}
                  </div>

                  <p className="text-xs leading-relaxed font-medium">
                    &ldquo;{cand.text}&rdquo;
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Immediate Educational Explanation Card */}
      {hasAnswered && selectedCandidate && (
        <div className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl backdrop-blur-md animate-in fade-in duration-200 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl mt-0.5 ${
                selectedCandidate.isCorrect
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-rose-500/20 text-rose-400'
              }`}>
                {selectedCandidate.isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>
                    {selectedCandidate.isCorrect
                      ? 'Masterful Completion! (+10 pts)'
                      : 'Not the optimal sentence choice!'}
                  </span>
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedCandidate.reason}
                </p>

                {!selectedCandidate.isCorrect && correctCandidate && (
                  <div className="mt-2 p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300">The ideal choice was:</strong>{' '}
                      &ldquo;{correctCandidate.text}&rdquo; &mdash; {correctCandidate.reason}
                    </div>
                  </div>
                )}

                <p className="text-[11px] text-cyan-400/90 pt-1">
                  💡 {currentChallenge.modelReviewSummary}
                </p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>{challengeIdx + 1 === LEVEL_5_CHALLENGES.length ? 'View Final Results' : 'Next Review'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
