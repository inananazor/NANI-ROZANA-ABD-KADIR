/**
 * Types and definitions for "Grab, Sort & Write!" ESL Review Game
 * CEFR B1-B2 Level / SPM English Writing Part 3
 */

export type Difficulty = 'easy' | 'medium' | 'hard';
export type InputMode = 'hand' | 'mouse';

export interface DetectiveOption {
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface DetectiveQuestion {
  id: string;
  topic: string;
  hookType: 'Rhetorical Question' | 'Problem Statement' | 'Intriguing Opening' | 'Vivid Sensory Hook';
  options: DetectiveOption[];
  pedagogicalTip: string;
}

export interface SentenceQuestion {
  id: string;
  topic: string;
  category: 'Introduction' | 'Description' | 'Opinion & Reason' | 'Recommendation';
  words: string[];
  correctOrder: string[];
  fullSentence: string;
  tip: string;
}

export type ReviewSection = 'Introduction' | 'Description' | 'Opinion' | 'Recommendation';

export interface StructureSentenceItem {
  id: string;
  text: string;
  section: ReviewSection;
  hint: string;
}

export interface StructureReview {
  id: string;
  title: string;
  category: 'Restaurant' | 'Movie' | 'Gadget' | 'Place of Interest' | 'Book';
  items: StructureSentenceItem[];
  explanation: Record<ReviewSection, string>;
}

export interface VocabWord {
  id: string;
  word: string;
  isReviewWord: boolean;
  definition: string;
  tone: 'positive' | 'negative' | 'recommendation' | 'irrelevant' | 'neutral';
  example: string;
}

export interface VocabRound {
  id: string;
  theme: string;
  targetCount: number;
  words: VocabWord[];
  instruction: string;
}

export interface ReviewCandidate {
  id: string;
  text: string;
  isCorrect: boolean;
  reason: string;
}

export interface ReviewMasterChallenge {
  id: string;
  title: string;
  category: 'Restaurant' | 'Film' | 'Gadget' | 'Travel Destination' | 'Book';
  reviewType: string;
  paragraphs: {
    section: ReviewSection;
    text: string;
    isBlank?: boolean;
  }[];
  missingSection: ReviewSection;
  candidates: ReviewCandidate[];
  modelReviewSummary: string;
}

export interface HandTrackingPoint {
  x: number; // 0 to 1
  y: number; // 0 to 1
  isPinching: boolean;
  pinchDistance: number;
  detected: boolean;
  timestamp: number;
}
