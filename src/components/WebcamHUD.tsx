import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff, Mouse, Minimize2, Maximize2, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { handTracker } from '../services/handTracker';
import { HandTrackingPoint, InputMode } from '../types/game';

interface WebcamHUDProps {
  inputMode: InputMode;
  onToggleInputMode: (mode: InputMode) => void;
  handPoint: HandTrackingPoint | null;
}

export const WebcamHUD: React.FC<WebcamHUDProps> = ({
  inputMode,
  onToggleInputMode,
  handPoint
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [trackerStatus, setTrackerStatus] = useState<'idle' | 'loading' | 'running' | 'error' | 'denied'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsub = handTracker.onStatus((status, err) => {
      setTrackerStatus(status);
      setErrorMessage(err || null);
    });
    return () => unsub();
  }, []);

  const startCameraTracking = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    await handTracker.startCamera(videoRef.current, canvasRef.current);
  };

  useEffect(() => {
    if (inputMode === 'hand') {
      startCameraTracking();
    } else {
      handTracker.stopCamera();
    }
    return () => {
      // Keep running if in hand mode across level switches
    };
  }, [inputMode]);

  const handleRetryCamera = () => {
    startCameraTracking();
  };

  const pinchPercentage = handPoint && handPoint.detected
    ? Math.max(0, Math.min(100, Math.round((1 - (handPoint.pinchDistance / 0.2)) * 100)))
    : 0;

  return (
    <aside
      aria-label="Webcam & Tracking HUD"
      className="fixed bottom-4 right-4 z-40 select-none transition-all duration-300"
    >
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl w-72 sm:w-80">
        {/* HUD Header */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-800/80 border-b border-slate-700/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              {inputMode === 'hand' ? (
                <Camera className="w-3.5 h-3.5 text-cyan-400" />
              ) : (
                <Mouse className="w-3.5 h-3.5 text-amber-400" />
              )}
              {inputMode === 'hand' ? 'Hand Tracker' : 'Mouse Mode'}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-[11px] text-slate-400">
              {inputMode === 'hand'
                ? trackerStatus === 'running'
                  ? handPoint?.detected
                    ? handPoint.isPinching
                      ? 'Pinching'
                      : 'Hand Tracked'
                    : 'Searching Hand'
                  : trackerStatus === 'loading'
                  ? 'Loading AI...'
                  : trackerStatus === 'denied'
                  ? 'Cam Denied'
                  : 'Ready'
                : 'Active'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
              title={isMinimized ? 'Expand HUD' : 'Minimize HUD'}
            >
              {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* HUD Content Area */}
        {!isMinimized && (
          <div className="p-3 space-y-2.5">
            {inputMode === 'hand' ? (
              <>
                {/* Video & Skeleton Viewport */}
                <div className="relative aspect-[4/3] w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
                  <video
                    ref={videoRef}
                    playsInline
                    muted
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                  <canvas
                    ref={canvasRef}
                    width={320}
                    height={240}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  />

                  {/* Tracking Indicator Overlay */}
                  {trackerStatus === 'loading' && (
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2 p-4 text-center">
                      <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin" />
                      <p className="text-xs text-slate-300 font-medium">Starting Hand Landmarker...</p>
                      <p className="text-[10px] text-slate-500">Loading lightweight vision model</p>
                    </div>
                  )}

                  {trackerStatus === 'denied' && (
                    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center gap-2 p-3 text-center">
                      <CameraOff className="w-6 h-6 text-rose-400" />
                      <p className="text-xs text-rose-300 font-semibold">Camera Access Blocked</p>
                      <p className="text-[11px] text-slate-400 leading-tight">
                        Please grant webcam permission in your browser or switch to Mouse Mode.
                      </p>
                      <button
                        onClick={() => onToggleInputMode('mouse')}
                        className="mt-1 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded text-xs hover:bg-amber-500/30 font-medium"
                      >
                        Switch to Mouse Mode
                      </button>
                    </div>
                  )}

                  {trackerStatus === 'error' && (
                    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center gap-2 p-3 text-center">
                      <AlertCircle className="w-6 h-6 text-amber-400" />
                      <p className="text-xs text-amber-300 font-medium">Camera Notice</p>
                      <p className="text-[10px] text-slate-400">{errorMessage || 'Unable to start camera'}</p>
                      <button
                        onClick={handleRetryCamera}
                        className="mt-1 px-3 py-1 bg-slate-800 text-slate-200 border border-slate-700 rounded text-xs hover:bg-slate-700"
                      >
                        Try Again
                      </button>
                    </div>
                  )}

                  {/* In-Frame Hand Presence Badge */}
                  {trackerStatus === 'running' && (
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-[10px]">
                      {handPoint?.detected ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-300 font-medium">Tracking</span>
                        </>
                      ) : (
                        <>
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                          <span className="text-amber-300 font-medium">Show hand to cam</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Pinch Calibration Meter */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Pinch Grip Intensity</span>
                    <span className={`font-mono font-medium ${handPoint?.isPinching ? 'text-emerald-400' : 'text-slate-300'}`}>
                      {pinchPercentage}% {handPoint?.isPinching ? '(GRABBED)' : ''}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                    <div
                      className={`h-full transition-all duration-75 ${
                        handPoint?.isPinching ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-cyan-500'
                      }`}
                      style={{ width: `${pinchPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Gesture Quick Guide */}
                <div className="bg-slate-800/60 rounded-lg p-2 border border-slate-700/40 text-[11px] text-slate-300 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🤏</span>
                    <span><strong>Pinch thumb + index:</strong> Grab cards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base">🖐️</span>
                    <span><strong>Release pinch:</strong> Drop or select</span>
                  </div>
                </div>
              </>
            ) : (
              /* Mouse Mode Active State */
              <div className="py-2 space-y-2 text-center">
                <p className="text-xs text-slate-300">
                  Mouse control enabled. Click and drag or tap cards directly to interact.
                </p>
                <button
                  onClick={() => onToggleInputMode('hand')}
                  className="w-full py-2 px-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <Camera className="w-3.5 h-3.5" />
                  Enable Hand Tracking
                </button>
              </div>
            )}

            {/* Switch Mode Button */}
            {inputMode === 'hand' && (
              <button
                onClick={() => onToggleInputMode('mouse')}
                className="w-full py-1.5 px-3 bg-slate-800 hover:bg-slate-700/80 text-slate-300 rounded-lg text-xs font-medium flex items-center justify-center gap-2 border border-slate-700 transition-colors"
              >
                <Mouse className="w-3.5 h-3.5 text-amber-400" />
                Switch to Mouse Mode
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
