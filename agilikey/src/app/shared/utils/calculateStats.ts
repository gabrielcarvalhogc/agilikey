export function calculateAccuracy(correct: number, total: number): number {
  return total ? Math.round((correct / total) * 100) : 100;
}

export function calculateWPM(correctChars: number, errors: number, elapsedMinutes: number): number {
  if (elapsedMinutes === 0) return 0;

  const grossWPM = (correctChars / 5) / elapsedMinutes;
  const penalty = (errors / 5) / elapsedMinutes;

  return Math.max(0, Math.round(grossWPM - penalty));
}
