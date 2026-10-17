import React from 'react';
import { Award, Zap, RotateCcw, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';
import { Difficulty } from '../types/game';

interface GameOverModalProps {
  score: number;
  highestStreak: number;
  difficulty: Difficulty;
  onPlayAgain: () => void;
  onSelectLevel: (lvl: number) => void;
  onOpenGuide: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  highestStreak,
  difficulty,
  onPlayAgain,
  onSelectLevel,
  onOpenGuide
}) => {
  // Determine CEFR Reviewer Tier
  let tierTitle = 'Apprentice Reviewer (CEFR B1 Initial)';
  let tierColor = 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  let teacherComment = 'Great first effort! Review the 4-part structure and practice using rhetorical questions and sensory vocabulary to hook your readers.';

  if (score >= 420) {
    tierTitle = 'Master Review Critic (CEFR B2+ Distinguished)';
    tierColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    teacherComment = 'Sensational mastery! You have demonstrated exceptional command of hook techniques, complex sentence structures, and evocative B2 vocabulary suitable for top marks in SPM Part 3.';
  } else if (score >= 320) {
    tierTitle = 'Accomplished Reviewer (CEFR B2 Proficient)';
    tierColor = 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
    teacherComment = 'Very strong performance! Your grasp of review structure and evaluative vocabulary is well within the B2 band. Keep refining your balanced criticism and concluding recommendations.';
  } else if (score >= 200) {
    tierTitle = 'Competent Reviewer (CEFR B1 Solid)';
    tierColor = 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10';
    teacherComment = 'Good progress! You understand the essential review sections. Aim to replace basic words with higher-level adjectives like "breathtaking" and "impeccable".';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-200 space-y-6">
        {/* Banner Graphic & Trophy Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(245,158,11,0.5)]">
            🏆
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Review Quest Completed!
          </h2>
          <p className="text-xs text-slate-400">
            SPM English Part 3 &bull; CEFR B1–B2 Review Writing Assessment
          </p>
        </div>

        {/* CEFR Honor Badge */}
        <div className={`p-4 rounded-2xl border text-center space-y-1 ${tierColor}`}>
          <div className="text-[11px] font-mono uppercase tracking-wider font-bold">
            Assessed Writing Level
          </div>
          <div className="text-lg font-bold">
            {tierTitle}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            {teacherComment}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
            <span className="text-[10px] text-slate-400 font-mono uppercase block">Total Points</span>
            <span className="text-xl font-bold font-mono text-amber-400 tabular-nums">{score}</span>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
            <span className="text-[10px] text-slate-400 font-mono uppercase block">Best Streak</span>
            <span className="text-xl font-bold font-mono text-orange-400 flex items-center justify-center gap-1">
              <Zap className="w-4 h-4 fill-current" />
              {highestStreak}x
            </span>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-center">
            <span className="text-[10px] text-slate-400 font-mono uppercase block">Difficulty</span>
            <span className="text-sm font-bold font-mono text-cyan-400 uppercase mt-1 block">{difficulty}</span>
          </div>
        </div>

        {/* SPM Review Competency Breakdown */}
        <div className="space-y-2 bg-slate-950/50 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300">
          <div className="font-semibold text-white mb-2 flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Curriculum Checklist Verified:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Catchy Hooks &amp; Introductions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>B2 Idiomatic Sentence Structures</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>4-Part Review Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>High-Impact Evaluative Adjectives</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={onPlayAgain}
            className="w-full sm:w-1/2 py-3 px-4 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again from Level 1</span>
          </button>

          <button
            onClick={onOpenGuide}
            className="w-full sm:w-1/2 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Open SPM Review Guide</span>
          </button>
        </div>

        {/* Jump to Specific Level */}
        <div className="text-center pt-1">
          <span className="text-[11px] text-slate-500 mr-2">Or practice any level directly:</span>
          <div className="inline-flex gap-1.5 pt-1">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button
                key={lvl}
                onClick={() => onSelectLevel(lvl)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] font-mono text-slate-300 font-bold transition-colors cursor-pointer"
              >
                L{lvl}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
