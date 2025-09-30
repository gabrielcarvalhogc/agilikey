export interface Key {
  id: string;
  label: string;
  upperLabel?: string;
  finger: string;
  row: number;
  width?: number;
}

export interface TypingStats {
  correct: number;
  incorrect: number;
  wpm: number;
}
