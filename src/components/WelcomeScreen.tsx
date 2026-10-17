import React from 'react';
import { Camera, Mouse, Sparkles, BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Difficulty, InputMode } from '../types/game';

interface WelcomeScreenProps {
  difficulty: Difficulty;
  onSetDifficulty: (diff: Difficulty) => void;
  onStartGame: (mode: InputMode) => void;
  onOpenGuide: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  difficulty,
  onSetDifficulty,
  onStartGame,
  onOpenGuide
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 flex flex-col items-center">
      {/* Hero Visual Card */}
      <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md mb-8 grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Column: Game Title & Overview */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider">
                CEFR B1–B2 &bull; SPM English Part 3
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Grab, Sort &amp; Write!
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Master the art of writing compelling, high-scoring reviews using real-time <strong>3D hand gestures</strong>. Pinch, drag, and drop floating review elements to unlock your writing potential!
            </p>
          </div>

          {/* 5-Level Architecture Roadmap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2 text-slate-300">
              <span className="font-mono text-cyan-400 font-bold">L1</span>
              <span><strong>Review Detective:</strong> Catchy Hooks</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2 text-slate-300">
              <span className="font-mono text-indigo-400 font-bold">L2</span>
              <span><strong>Sentence Builder:</strong> B2 Idioms</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2 text-slate-300">
              <span className="font-mono text-purple-400 font-bold">L3</span>
              <span><strong>Review Structure:</strong> 4 Core Sections</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2 text-slate-300">
              <span className="font-mono text-amber-400 font-bold">L4</span>
              <span><strong>Vocabulary Catcher:</strong> Evaluative Words</span>
            </div>
            <div className="sm:col-span-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-2 text-slate-300">
              <span className="font-mono text-emerald-400 font-bold">L5</span>
              <span><strong>Review Master:</strong> Complete Full SPM Model Reviews</span>
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block font-mono">
              Choose Difficulty Setting:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => onSetDifficulty(d)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold capitalize transition-all cursor-pointer ${
                    difficulty === d
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {d}
                  <span className="block text-[10px] font-normal text-slate-500 mt-0.5">
                    {d === 'easy' ? 'Relaxed hints' : d === 'medium' ? 'Standard (+10)' : 'Expert (+15)'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons: Hand Tracking vs Mouse */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => onStartGame('hand')}
              className="w-full sm:w-2/3 py-3 px-5 bg-gradient-to-r from-cyan-600 via-indigo-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Camera className="w-4 h-4 text-cyan-200" />
              <span>Start with Hand Tracking</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onStartGame('mouse')}
              className="w-full sm:w-1/3 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mouse className="w-4 h-4 text-amber-400" />
              <span>Mouse Mode</span>
            </button>
          </div>
        </div>

        {/* Right Column: Hero Art & Gesture Guide */}
        <div className="lg:col-span-5 bg-slate-950/80 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800 space-y-6">
          {/* Hero Image Container */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl group aspect-[16/10]">
            <img
              src="/src/assets/images/game_hero_banner_1792235310138.jpg"
              alt="Grab, Sort &amp; Write Game Experience"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end p-4">
              <span className="text-xs font-semibold text-white drop-shadow">
                AI MediaPipe Vision Hand Tracking
              </span>
            </div>
          </div>

          {/* How Hand Tracking Works Guide */}
          <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hand Gesture Instructions</span>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <span className="text-lg leading-none">📷</span>
                <div>
                  <strong>Allow Camera Access:</strong> Webcam runs locally in your browser for privacy.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-lg leading-none">🤏</span>
                <div>
                  <strong>Pinch (Thumb + Index):</strong> Grabs cards, vocabulary blocks, and sentence parts.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-lg leading-none">✋</span>
                <div>
                  <strong>Move &amp; Release:</strong> Drag objects and release the pinch to drop into target bins.
                </div>
              </div>
            </div>
          </div>

          {/* Educational Review Guide Button */}
          <button
            onClick={onOpenGuide}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-850 text-cyan-400 border border-cyan-500/30 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open SPM Review Writing Cheat Sheet</span>
          </button>
        </div>
      </div>
    </div>
  );
};
