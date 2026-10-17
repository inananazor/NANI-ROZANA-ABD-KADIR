import React from 'react';
import { HandTrackingPoint } from '../types/game';

interface VirtualHandCursorProps {
  point: HandTrackingPoint | null;
  active: boolean;
}

export const VirtualHandCursor: React.FC<VirtualHandCursorProps> = ({ point, active }) => {
  if (!active || !point || !point.detected) {
    return null;
  }

  const posX = point.x * window.innerWidth;
  const posY = point.y * window.innerHeight;
  const isPinching = point.isPinching;

  return (
    <div
      className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
      style={{
        left: `${posX}px`,
        top: `${posY}px`,
      }}
    >
      {/* Outer Pulse Glow Ring */}
      <div
        className={`w-14 h-14 rounded-full border-2 transition-all duration-150 flex items-center justify-center ${
          isPinching
            ? 'border-emerald-400 bg-emerald-500/25 scale-90 shadow-[0_0_25px_rgba(52,211,153,0.8)]'
            : 'border-cyan-400/80 bg-cyan-500/15 scale-110 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
        }`}
      >
        {/* Inner Core Dot */}
        <div
          className={`w-4 h-4 rounded-full transition-all duration-150 ${
            isPinching
              ? 'bg-emerald-300 scale-125'
              : 'bg-cyan-300 scale-100'
          }`}
        />
      </div>

      {/* Floating State Label */}
      <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md border border-white/20 bg-slate-900/85 text-slate-200 shadow-md">
        {isPinching ? 'GRABBING' : 'PINCH TO GRAB'}
      </div>

      {/* Hand Gesture Icon Marker */}
      <div
        className={`absolute -top-3 -right-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
          isPinching ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-cyan-300 border border-cyan-500/50'
        }`}
      >
        {isPinching ? '✊' : '✋'}
      </div>
    </div>
  );
};
