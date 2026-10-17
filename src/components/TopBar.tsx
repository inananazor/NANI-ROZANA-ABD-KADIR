import React from 'react';
import { Volume2, VolumeX, Camera, Mouse, BookOpen, Layers } from 'lucide-react';
import { Difficulty, InputMode } from '../types/game';
import { sounds } from '../utils/audio';

interface TopBarProps {
  currentLevel: number;
  score: number;
  streak: number;
  difficulty: Difficulty;
  inputMode: InputMode;
  soundEnabled: boolean;
  onSelectLevel: (lvl: number) => void;
  onSetDifficulty: (diff: Difficulty) => void;
  onToggleInputMode: (mode: InputMode) => void;
  onToggleSound: () => void;
  onOpenGuide: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentLevel,
  score,
  streak,
  difficulty,
  inputMode,
  soundEnabled,
  onSelectLevel,
  onSetDifficulty,
  onToggleInputMode,
  onToggleSound,
  onOpenGuide
}) => {
  const [showLevelDropdown, setShowLevelDropdown] = React.useState(false);

  const levelNames = [
    'Review Detective',
    'Sentence Builder',
    'Review Structure',
    'Vocabulary Catcher',
    'Review Master'
  ];

  return (
    <header className="relative z-30 flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onSelectLevel(1); }}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-cyan-400 transition-colors flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white text-base shadow-md">
            ✍️
          </span>
          <span>Grab, Sort &amp; Write!</span>
        </a>

        {/* Level badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
          <span className="font-semibold text-cyan-400">Level {currentLevel}:</span>
          <span className="text-slate-300 truncate max-w-[160px]">{levelNames[currentLevel - 1]}</span>
        </div>
      </div>

      {/* Zone 2: 4–5 clean single-line text navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-300">
        {/* Guide Link */}
        <button
          onClick={onOpenGuide}
          className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>Review Guide</span>
        </button>

        {/* Level Jump */}
        <div className="relative">
          <button
            onClick={() => setShowLevelDropdown(!showLevelDropdown)}
            className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Select Level</span>
          </button>

          {showLevelDropdown && (
            <div className="absolute top-full mt-2 left-0 w-52 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1.5 space-y-1 z-50">
              {levelNames.map((name, index) => {
                const lvl = index + 1;
                return (
                  <button
                    key={lvl}
                    onClick={() => {
                      onSelectLevel(lvl);
                      setShowLevelDropdown(false);
                      sounds.playGrab();
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      currentLevel === lvl
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>L{lvl}. {name}</span>
                    {currentLevel === lvl && <span className="text-cyan-400 text-[10px]">● Active</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Difficulty Switch */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => {
                onSetDifficulty(d);
                sounds.playGrab();
              }}
              className={`px-2 py-1 text-[11px] font-semibold rounded capitalize transition-colors ${
                difficulty === d
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Audio Synthesizer Toggle */}
        <button
          onClick={onToggleSound}
          className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-slate-500" />
          )}
          <span>{soundEnabled ? 'Sound On' : 'Muted'}</span>
        </button>

        {/* Current Score & Streak Info */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-800 font-mono text-xs">
          <div className="text-slate-400">
            Score: <span className="font-bold text-amber-400 tabular-nums">{score}</span>
          </div>
          {streak > 1 && (
            <div className="text-orange-400 flex items-center gap-1 font-semibold">
              <span>🔥 {streak}x</span>
            </div>
          )}
        </div>
      </nav>

      {/* Zone 3: 1 primary action (Hand vs Mouse toggle) */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => {
            const nextMode = inputMode === 'hand' ? 'mouse' : 'hand';
            onToggleInputMode(nextMode);
            sounds.playPinch();
          }}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all shadow-md whitespace-nowrap shrink-0 ${
            inputMode === 'hand'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500'
              : 'bg-slate-800 text-amber-300 border border-amber-500/40 hover:bg-slate-700'
          }`}
        >
          {inputMode === 'hand' ? (
            <>
              <Camera className="w-3.5 h-3.5 text-cyan-200" />
              <span>Hand Tracking Active</span>
            </>
          ) : (
            <>
              <Mouse className="w-3.5 h-3.5 text-amber-400" />
              <span>Mouse Mode Active</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
