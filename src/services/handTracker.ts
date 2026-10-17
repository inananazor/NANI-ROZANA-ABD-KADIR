/**
 * Hand Tracker Service using MediaPipe Tasks Vision HandLandmarker
 */

import { FilesetResolver, HandLandmarker, HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { HandTrackingPoint } from '../types/game';

type HandUpdateCallback = (point: HandTrackingPoint) => void;
type StatusCallback = (status: 'idle' | 'loading' | 'running' | 'error' | 'denied', errorMsg?: string) => void;

class HandTrackerService {
  private landmarker: HandLandmarker | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private canvasElement: HTMLCanvasElement | null = null;
  private stream: MediaStream | null = null;
  private animationFrameId: number | null = null;
  private isInitializing: boolean = false;
  private lastVideoTime: number = -1;

  // Smoothing filter state
  private smoothX: number = 0.5;
  private smoothY: number = 0.5;
  private isPinchingState: boolean = false;
  private callbacks: Set<HandUpdateCallback> = new Set();
  private statusCallbacks: Set<StatusCallback> = new Set();

  public status: 'idle' | 'loading' | 'running' | 'error' | 'denied' = 'idle';
  public lastError: string | null = null;

  public onUpdate(cb: HandUpdateCallback): () => void {
    this.callbacks.add(cb);
    return () => {
      this.callbacks.delete(cb);
    };
  }

  public onStatus(cb: StatusCallback): () => void {
    this.statusCallbacks.add(cb);
    cb(this.status, this.lastError || undefined);
    return () => {
      this.statusCallbacks.delete(cb);
    };
  }

  private notifyStatus(status: 'idle' | 'loading' | 'running' | 'error' | 'denied', errorMsg?: string) {
    this.status = status;
    this.lastError = errorMsg || null;
    this.statusCallbacks.forEach(cb => cb(status, errorMsg));
  }

  async initialize() {
    if (this.landmarker) return true;
    if (this.isInitializing) return false;

    this.isInitializing = true;
    this.notifyStatus('loading');

    try {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      );

      this.landmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
          delegate: 'GPU'
        },
        runningMode: 'VIDEO',
        numHands: 1
      });

      this.isInitializing = false;
      return true;
    } catch (err: unknown) {
      console.warn('Failed to load GPU delegate, retrying with CPU delegate...', err);
      try {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        );
        this.landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
            delegate: 'CPU'
          },
          runningMode: 'VIDEO',
          numHands: 1
        });
        this.isInitializing = false;
        return true;
      } catch (cpuErr: unknown) {
        this.isInitializing = false;
        const msg = cpuErr instanceof Error ? cpuErr.message : 'Failed to initialize Hand Landmarker';
        this.notifyStatus('error', msg);
        return false;
      }
    }
  }

  async startCamera(video: HTMLVideoElement, canvas?: HTMLCanvasElement) {
    this.videoElement = video;
    this.canvasElement = canvas || null;

    if (!this.landmarker) {
      const ready = await this.initialize();
      if (!ready) return false;
    }

    try {
      this.notifyStatus('loading');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      });

      this.stream = stream;
      this.videoElement.srcObject = stream;
      await new Promise<void>((resolve) => {
        if (!this.videoElement) return resolve();
        this.videoElement.onloadedmetadata = () => {
          this.videoElement?.play().then(() => resolve()).catch(() => resolve());
        };
      });

      this.notifyStatus('running');
      this.startDetectionLoop();
      return true;
    } catch (err: unknown) {
      const error = err as { name?: string; message?: string };
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        this.notifyStatus('denied', 'Camera permission was denied. You can play using Mouse Mode anytime!');
      } else {
        this.notifyStatus('error', error.message || 'Could not access webcam.');
      }
      return false;
    }
  }

  stopCamera() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.videoElement) {
      this.videoElement.srcObject = null;
    }
    this.notifyStatus('idle');
  }

  private startDetectionLoop() {
    const loop = () => {
      if (!this.videoElement || !this.landmarker || this.status !== 'running') {
        return;
      }

      if (this.videoElement.currentTime !== this.lastVideoTime && this.videoElement.readyState >= 2) {
        this.lastVideoTime = this.videoElement.currentTime;
        const startTimeMs = performance.now();
        const results = this.landmarker.detectForVideo(this.videoElement, startTimeMs);
        this.processLandmarks(results);
      }

      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }

  private processLandmarks(results: HandLandmarkerResult) {
    const canvas = this.canvasElement;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx && this.videoElement) {
      // Clear overlay canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    if (!results.landmarks || results.landmarks.length === 0) {
      // No hand detected in frame
      const point: HandTrackingPoint = {
        x: this.smoothX,
        y: this.smoothY,
        isPinching: false,
        pinchDistance: 1,
        detected: false,
        timestamp: Date.now()
      };
      this.callbacks.forEach(cb => cb(point));
      return;
    }

    const landmarks = results.landmarks[0];

    // Landmark 4: Thumb Tip
    const thumb = landmarks[4];
    // Landmark 8: Index Finger Tip
    const index = landmarks[8];

    // 2D distance between thumb tip and index tip in normalized space
    const dx = thumb.x - index.x;
    const dy = thumb.y - index.y;
    const dz = (thumb.z || 0) - (index.z || 0);
    const pinchDistance = Math.sqrt(dx * dx + dy * dy + dz * dz * 0.5);

    // Hysteresis threshold to prevent jitter when holding pinch
    const PINCH_START = 0.078;
    const PINCH_END = 0.095;

    if (this.isPinchingState) {
      if (pinchDistance > PINCH_END) {
        this.isPinchingState = false;
      }
    } else {
      if (pinchDistance < PINCH_START) {
        this.isPinchingState = true;
      }
    }

    // Midpoint between thumb and index finger
    // Mirror X coordinate because webcam is front-facing
    const rawX = 1 - (thumb.x + index.x) / 2;
    const rawY = (thumb.y + index.y) / 2;

    // Exponential smoothing (alpha = 0.35: smooth yet reactive)
    const alpha = 0.38;
    this.smoothX = this.smoothX * (1 - alpha) + rawX * alpha;
    this.smoothY = this.smoothY * (1 - alpha) + rawY * alpha;

    // Optional: Draw skeleton on mini HUD canvas
    if (canvas && ctx) {
      this.drawHandSkeleton(ctx, landmarks, canvas.width, canvas.height, this.isPinchingState);
    }

    const point: HandTrackingPoint = {
      x: Math.max(0, Math.min(1, this.smoothX)),
      y: Math.max(0, Math.min(1, this.smoothY)),
      isPinching: this.isPinchingState,
      pinchDistance,
      detected: true,
      timestamp: Date.now()
    };

    this.callbacks.forEach(cb => cb(point));
  }

  private drawHandSkeleton(
    ctx: CanvasRenderingContext2D,
    landmarks: { x: number; y: number }[],
    width: number,
    height: number,
    isPinching: boolean
  ) {
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4], // thumb
      [0, 5], [5, 6], [6, 7], [7, 8], // index
      [0, 9], [9, 10], [10, 11], [11, 12], // middle
      [0, 13], [13, 14], [14, 15], [15, 16], // ring
      [0, 17], [17, 18], [18, 19], [19, 20], // pinky
      [5, 9], [9, 13], [13, 17] // palm
    ];

    ctx.save();
    // Mirror drawing on canvas to align with mirror view
    ctx.translate(width, 0);
    ctx.scale(-1, 1);

    // Draw connection lines
    ctx.strokeStyle = isPinching ? 'rgba(34, 197, 94, 0.85)' : 'rgba(56, 189, 248, 0.6)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    connections.forEach(([i, j]) => {
      const p1 = landmarks[i];
      const p2 = landmarks[j];
      ctx.moveTo(p1.x * width, p1.y * height);
      ctx.lineTo(p2.x * width, p2.y * height);
    });
    ctx.stroke();

    // Draw landmarks
    landmarks.forEach((p, idx) => {
      const isTip = idx === 4 || idx === 8;
      ctx.beginPath();
      ctx.arc(p.x * width, p.y * height, isTip ? 5 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = isTip
        ? isPinching ? '#22c55e' : '#f59e0b'
        : '#ffffff';
      ctx.fill();
    });

    ctx.restore();
  }
}

export const handTracker = new HandTrackerService();
