import React, { useState, useEffect } from 'react';
import { LEVEL_3_REVIEWS } from '../../data/gameContent';
import { HandTrackingPoint, InputMode, Difficulty, ReviewSection, StructureSentenceItem } from '../../types/game';
import { LevelHeader } from '../LevelHeader';
import { sounds } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { CheckCircle2, ArrowRight, Lightbulb, Check } from 'lucide-react';

interface Level3StructureProps {
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

const SECTIONS: ReviewSection[] = ['Introduction', 'Description', 'Opinion', 'Recommendation'];

export const Level3Structure: React.FC<Level3StructureProps> = ({
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
  const [reviewIdx, setReviewIdx] = useState(0);
  const [unassignedItems, setUnassignedItems] = useState<StructureSentenceItem[]>([]);
  const [placedItems, setPlacedItems] = useState<Partial<Record<ReviewSection, StructureSentenceItem>>>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [hoveredTarget, setHoveredTarget] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);
  const [wasPinching, setWasPinching] = useState(false);

  const currentReview = LEVEL_3_REVIEWS[reviewIdx];

  useEffect(() => {
    // Shuffle the 4 sentences
    const shuffled = [...currentReview.items].sort(() => Math.random() - 0.5);
    setUnassignedItems(shuffled);
    setPlacedItems({});
    setSelectedItemId(null);
    setIsCompleted(false);
    setIsAllCorrect(false);
  }, [reviewIdx]);

  // Hand tracking pinch selection / drop detection
  useEffect(() => {
    if (inputMode !== 'hand' || !handPoint || !handPoint.detected || isCompleted) {
      setWasPinching(false);
      return;
    }

    const screenX = handPoint.x * window.innerWidth;
    const screenY = handPoint.y * window.innerHeight;

    const elem = document.elementFromPoint(screenX, screenY);
    const targetBin = elem?.closest('[data-section-target]') as HTMLElement | null;
    const targetSection = targetBin ? (targetBin.getAttribute('data-section-target') as ReviewSection) : null;
    const cardElem = elem?.closest('[data-item-id]') as HTMLElement | null;
    const itemId = cardElem ? cardElem.getAttribute('data-item-id') : null;

    setHoveredTarget(targetSection || itemId || null);

    // If pinched down
    if (handPoint.isPinching && !wasPinching) {
      if (itemId) {
        sounds.playGrab();
        setSelectedItemId(itemId);
      } else if (targetSection && selectedItemId) {
        // Drop into target
        placeItemIntoSection(selectedItemId, targetSection);
      }
    }
    // If pinch released over a bin
    else if (!handPoint.isPinching && wasPinching && selectedItemId && targetSection) {
      placeItemIntoSection(selectedItemId, targetSection);
    }

    setWasPinching(handPoint.isPinching);
  }, [handPoint, inputMode, isCompleted, wasPinching, selectedItemId, unassignedItems, placedItems]);

  const placeItemIntoSection = (itemId: string, targetSection: ReviewSection) => {
    const item = currentReview.items.find(i => i.id === itemId);
    if (!item) return;

    sounds.playDrop();

    // Check if slot already has something
    const existing = placedItems[targetSection];
    const newPlaced = { ...placedItems, [targetSection]: item };
    const newUnassigned = unassignedItems.filter(i => i.id !== itemId);
    if (existing && existing.id !== itemId) {
      newUnassigned.push(existing);
    }

    setPlacedItems(newPlaced);
    setUnassignedItems(newUnassigned);
    setSelectedItemId(null);

    // If all 4 sections placed, evaluate!
    if (Object.keys(newPlaced).length === 4) {
      evaluatePlacement(newPlaced);
    }
  };

  const handleCardClick = (itemId: string) => {
    if (isCompleted) return;
    sounds.playGrab();
    setSelectedItemId(itemId === selectedItemId ? null : itemId);
  };

  const handleBinClick = (section: ReviewSection) => {
    if (isCompleted) return;
    if (selectedItemId) {
      placeItemIntoSection(selectedItemId, section);
    } else if (placedItems[section]) {
      // Return item back to unassigned pool
      sounds.playDrop();
      const item = placedItems[section]!;
      const newPlaced = { ...placedItems };
      delete newPlaced[section];
      setPlacedItems(newPlaced);
      setUnassignedItems(prev => [...prev, item]);
    }
  };

  const evaluatePlacement = (placed: Partial<Record<ReviewSection, StructureSentenceItem>>) => {
    let allCorrect = true;
    SECTIONS.forEach(sec => {
      if (placed[sec]?.section !== sec) {
        allCorrect = false;
      }
    });

    setIsCompleted(true);
    setIsAllCorrect(allCorrect);

    if (allCorrect) {
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
    if (reviewIdx + 1 < LEVEL_3_REVIEWS.length) {
      setReviewIdx(prev => prev + 1);
    } else {
      sounds.playLevelComplete();
      onLevelComplete();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-2 flex flex-col items-center">
      <LevelHeader
        levelNumber={3}
        levelTitle="Review Structure"
        questionIndex={reviewIdx}
        totalQuestions={LEVEL_3_REVIEWS.length}
        score={score}
        streak={streak}
        difficulty={difficulty}
        instruction="Pinch and drag each sentence into its rightful section: Introduction, Description, Opinion, or Recommendation!"
        onOpenGuide={onOpenGuide}
      />

      {/* Review Subject Header */}
      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-4 shadow-xl backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase font-bold text-cyan-400 font-mono">
            Review Title:
          </span>
          <span className="text-sm font-semibold text-white">
            {currentReview.title}
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-xs text-indigo-300 font-medium px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30">
            {currentReview.category}
          </span>
        </div>

        <div className="text-xs text-slate-400">
          {Object.keys(placedItems).length} of 4 sections sorted
        </div>
      </div>

      {/* 4 Glowing Section Target Bins */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5 perspective-1000">
        {SECTIONS.map((section) => {
          const placedItem = placedItems[section];
          const isTargetHovered = hoveredTarget === section;
          const isCorrect = placedItem && placedItem.section === section;

          let binBorder = 'border-dashed border-slate-700 bg-slate-900/60';
          if (isTargetHovered && selectedItemId) {
            binBorder = 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-[1.02]';
          }
          if (placedItem) {
            if (isCompleted) {
              binBorder = isCorrect
                ? 'border-emerald-500 bg-emerald-950/40 text-emerald-100'
                : 'border-rose-500 bg-rose-950/40 text-rose-100';
            } else {
              binBorder = 'border-cyan-500/80 bg-slate-850 shadow-md';
            }
          }

          return (
            <div
              key={section}
              data-section-target={section}
              onClick={() => handleBinClick(section)}
              className={`min-h-[170px] rounded-2xl p-4 border-2 transition-all duration-200 flex flex-col justify-between select-none cursor-pointer transform-style-3d ${binBorder}`}
            >
              <div>
                {/* Bin Header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
                    {section}
                  </span>
                  {placedItem && isCompleted && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {isCorrect ? '✓ Match' : '✕ Misplaced'}
                    </span>
                  )}
                </div>

                {/* Placed Content or Placeholder */}
                {placedItem ? (
                  <p className="text-xs leading-relaxed text-slate-200 font-medium">
                    &ldquo;{placedItem.text}&rdquo;
                  </p>
                ) : (
                  <div className="h-24 flex flex-col items-center justify-center text-center p-2 text-slate-500 text-[11px] leading-snug">
                    <span>{selectedItemId ? 'Pinch here to drop card' : 'Empty Target'}</span>
                  </div>
                )}
              </div>

              {placedItem && !isCompleted && (
                <div className="text-[10px] text-slate-500 pt-2 flex items-center justify-between">
                  <span>Click / pinch to remove</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Unassigned Sentence Cards */}
      {unassignedItems.length > 0 && !isCompleted && (
        <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-md mb-4 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
            <span className="font-mono uppercase font-semibold text-cyan-400">
              Unassigned Sentences ({unassignedItems.length} remaining)
            </span>
            <span className="text-[11px] text-slate-500">
              Pinch card, then pinch target section
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {unassignedItems.map((item) => {
              const isSelected = selectedItemId === item.id;
              const isHovered = hoveredTarget === item.id;

              return (
                <div
                  key={item.id}
                  data-item-id={item.id}
                  onClick={() => handleCardClick(item.id)}
                  className={`p-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none card-3d-tilt shadow-md ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-500/25 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] transform -translate-y-1 scale-102'
                      : isHovered
                      ? 'border-slate-600 bg-slate-800 text-slate-200'
                      : 'border-slate-800 bg-slate-850 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <p className="text-xs leading-relaxed font-medium">
                    &ldquo;{item.text}&rdquo;
                  </p>
                  {isSelected && (
                    <div className="mt-2 text-[10px] font-bold text-cyan-300 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>CARD GRABBED - Now pinch any target section bin above!</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Feedback Summary when Finished */}
      {isCompleted && (
        <div className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl backdrop-blur-md animate-in fade-in duration-200 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl mt-0.5 ${
                isAllCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}>
                {isAllCorrect ? <CheckCircle2 className="w-6 h-6" /> : <Lightbulb className="w-6 h-6" />}
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white">
                  {isAllCorrect
                    ? 'Perfect Structural Awareness! (+10 pts)'
                    : 'Review Structure Breakdown'}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Notice how each sentence serves its dedicated role:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300">
                    <strong className="text-cyan-400">Introduction:</strong> {currentReview.explanation.Introduction}
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300">
                    <strong className="text-purple-400">Description:</strong> {currentReview.explanation.Description}
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300">
                    <strong className="text-amber-400">Opinion:</strong> {currentReview.explanation.Opinion}
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300">
                    <strong className="text-emerald-400">Recommendation:</strong> {currentReview.explanation.Recommendation}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>{reviewIdx + 1 === LEVEL_3_REVIEWS.length ? 'Finish Level 3' : 'Next Review'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
