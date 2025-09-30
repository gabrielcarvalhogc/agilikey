import type { Key } from '../keyboard/key-types';

const SPECIAL_CHARS: Record<string,string> = {
  'ç': 'ccedil',
  ',': 'comma',
  '.': 'period',
  ';': 'semicolon',
  '/': 'slash',
  "'": 'quote',
  '\\': 'backslash',
  '-': 'minus',
  '=': 'equal'
};

export function getKeyId(ev: KeyboardEvent): string | null {
  const key = ev.key.toLowerCase();
  if (key === ' ') return 'space';
  if (key === 'backspace') return 'backspace';
  if (key === 'enter') return 'enter';
  if (key === 'tab') return 'tab';
  if (key === 'shift') return ev.location === 1 ? 'shiftleft' : 'shiftright';
  if (key === 'control') return ev.location === 1 ? 'ctrlleft' : 'ctrlright';
  if (key === 'alt') return ev.location === 1 ? 'altleft' : 'altright';
  if (key.length === 1 && /[a-z]/.test(key)) return key;
  return SPECIAL_CHARS[key] || null;
}
