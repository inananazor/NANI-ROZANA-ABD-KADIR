import React from 'react';
import { Award, Zap, HelpCircle } from 'lucide-react';
import { Difficulty } from '../types/game';

interface LevelHeaderProps {
  levelNumber: number;
  levelTitle: string;
  questionIndex: number;
  totalQuestions: number;
  score: number;
  streak: number;
  difficulty: Difficulty;
  instruction: string;
  onOpenGuide: () => void;
}

export const LevelHeader: React.FC<LevelHeaderProps> = ({
  levelNumber,
  levelTitle,
  questionIndex,
  totalQuestions,
  score,
  streak,
  difficulty,
  instruction,
  onOpenGuide
}) => {
  const progressPercent = Math.round(((questionIndex) / totalQuestions) * 100);

  return (
    <div className="w-full max-w-5xl mx-auto mb-4 space-y-2">
      {/* Upper Status Line */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
            LEVEL {levelNumber}
          </span>
          <h1 className="text-base font-bold text-white tracking-tight">
            {levelTitle}
          </h1>
          <span className="text-slate-600">·</span>
          <span className="text-xs text-slate-400 font-medium">
            Challenge <strong className="text-white font-mono">{questionIndex + 1}</strong> of <span className="font-mono">{totalQuestions}</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">Score:</span>
            <span className="font-mono font-bold text-amber-400 tabular-nums">{score}</span>
          </div>

          {streak > 1 && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-orange-500/20 border border-orange-500/30 text-orange-400 font-bold font-mono">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{streak} Streak (+{difficulty === 'hard' ? 15 : 10})</span>
            </div>
          )}

          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
            title="Open Review Guide"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Help</span>
          </button>
        </div>
      </div>

      {/* Progress Bar Line */}
      <div className="h-1.5 w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-800">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Level Instruction Banner */}
      <div className="flex items-center justify-between text-xs text-slate-300 px-1">
        <p className="leading-snug text-slate-300">
          <span className="text-cyan-400 font-semibold mr-1">Objective:</span>
          {instruction}
        </p>
        <span className="text-slate-500 text-[11px] shrink-0 ml-2">
          Gesture: 🤏 Pinch thumb &amp; index finger to grab/select
        </span>
      </div>
    </div>
  );
};
