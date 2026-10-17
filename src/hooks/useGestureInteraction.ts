import { useEffect, useRef } from 'react';
import { HandTrackingPoint, InputMode } from '../types/game';
import { sounds } from '../utils/audio';

interface GestureHandlerOptions {
  handPoint: HandTrackingPoint | null;
  inputMode: InputMode;
  onHoverItem?: (itemId: string | null) => void;
  onGrabItem?: (itemId: string) => void;
  onDragItem?: (itemId: string, screenX: number, screenY: number) => void;
  onDropItem?: (itemId: string, screenX: number, screenY: number) => void;
  onTapItem?: (itemId: string) => void;
}

export function useGestureInteraction({
  handPoint,
  inputMode,
  onHoverItem,
  onGrabItem,
  onDragItem,
  onDropItem,
  onTapItem
}: GestureHandlerOptions) {
  const grabbedIdRef = useRef<string | null>(null);
  const wasPinchingRef = useRef<boolean>(false);
  const lastHoveredIdRef = useRef<string | null>(null);
  const pinchStartTimeRef = useRef<number>(0);

  useEffect(() => {
    if (inputMode !== 'hand' || !handPoint || !handPoint.detected) {
      if (grabbedIdRef.current) {
        // Lost tracking while grabbing, drop it safely
        onDropItem?.(grabbedIdRef.current, window.innerWidth / 2, window.innerHeight / 2);
        grabbedIdRef.current = null;
      }
      wasPinchingRef.current = false;
      return;
    }

    const screenX = handPoint.x * window.innerWidth;
    const screenY = handPoint.y * window.innerHeight;

    // Identify target element under virtual cursor
    const element = document.elementFromPoint(screenX, screenY);
    const interactiveTarget = element?.closest('[data-interactive-id]') as HTMLElement | null;
    const targetId = interactiveTarget?.getAttribute('data-interactive-id') || null;

    if (targetId !== lastHoveredIdRef.current) {
      lastHoveredIdRef.current = targetId;
      onHoverItem?.(targetId);
    }

    const isNowPinching = handPoint.isPinching;

    // Detect pinch down (grab)
    if (isNowPinching && !wasPinchingRef.current) {
      pinchStartTimeRef.current = Date.now();
      if (targetId) {
        grabbedIdRef.current = targetId;
        sounds.playPinch();
        sounds.playGrab();
        onGrabItem?.(targetId);
      }
    }
    // Detect drag
    else if (isNowPinching && wasPinchingRef.current && grabbedIdRef.current) {
      onDragItem?.(grabbedIdRef.current, screenX, screenY);
    }
    // Detect pinch release (drop or tap)
    else if (!isNowPinching && wasPinchingRef.current) {
      if (grabbedIdRef.current) {
        const duration = Date.now() - pinchStartTimeRef.current;
        sounds.playDrop();
        onDropItem?.(grabbedIdRef.current, screenX, screenY);
        if (duration < 350) {
          onTapItem?.(grabbedIdRef.current);
        }
        grabbedIdRef.current = null;
      }
    }

    wasPinchingRef.current = isNowPinching;
  }, [handPoint, inputMode, onGrabItem, onDragItem, onDropItem, onTapItem, onHoverItem]);

  return {
    grabbedId: grabbedIdRef.current
  };
}
