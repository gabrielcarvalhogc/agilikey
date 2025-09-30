import { Key } from './key-types';

export function initializeKeyboard(): Key[] {
  const keys: Key[] = [];

  keys.push(
    { id: 'quote', label: "'", upperLabel: '"', finger: 'left-pinky', row: 1 },
    { id: '1', label: '1', upperLabel: '!', finger: 'left-pinky', row: 1 },
    { id: '2', label: '2', upperLabel: '@', finger: 'left-ring', row: 1 },
    { id: '3', label: '3', upperLabel: '#', finger: 'left-middle', row: 1 },
    { id: '4', label: '4', upperLabel: '$', finger: 'left-index', row: 1 },
    { id: '5', label: '5', upperLabel: '%', finger: 'left-index-extended', row: 1 },
    { id: '6', label: '6', upperLabel: '¨', finger: 'right-index-extended', row: 1 },
    { id: '7', label: '7', upperLabel: '&', finger: 'right-index', row: 1 },
    { id: '8', label: '8', upperLabel: '*', finger: 'right-middle', row: 1 },
    { id: '9', label: '9', upperLabel: '(', finger: 'right-ring', row: 1 },
    { id: '0', label: '0', upperLabel: ')', finger: 'right-pinky', row: 1 },
    { id: 'minus', label: '-', upperLabel: '_', finger: 'right-pinky', row: 1 },
    { id: 'equal', label: '=', upperLabel: '+', finger: 'right-pinky', row: 1 },
    { id: 'backspace', label: '⌫', finger: 'right-pinky', row: 1, width: 1.5 }
  );

  keys.push(
    { id: 'tab', label: 'Tab', finger: 'left-pinky', row: 2, width: 1.5 },
    { id: 'q', label: 'Q', finger: 'left-pinky', row: 2 },
    { id: 'w', label: 'W', finger: 'left-ring', row: 2 },
    { id: 'e', label: 'E', finger: 'left-middle', row: 2 },
    { id: 'r', label: 'R', finger: 'left-index', row: 2 },
    { id: 't', label: 'T', finger: 'left-index-extended', row: 2 },
    { id: 'y', label: 'Y', finger: 'right-index-extended', row: 2 },
    { id: 'u', label: 'U', finger: 'right-index', row: 2 },
    { id: 'i', label: 'I', finger: 'right-middle', row: 2 },
    { id: 'o', label: 'O', finger: 'right-ring', row: 2 },
    { id: 'p', label: 'P', finger: 'right-pinky', row: 2 },
    { id: 'acute', label: '´', upperLabel: '`', finger: 'right-pinky', row: 2 },
    { id: 'bracket', label: '[', upperLabel: '{', finger: 'right-pinky', row: 2 },
    { id: 'enter', label: '↵', finger: 'right-pinky', row: 2, width: 1.5 }
  );

  keys.push(
    { id: 'capslock', label: 'Caps', finger: 'left-pinky', row: 3, width: 1.8 },
    { id: 'a', label: 'A', finger: 'left-pinky', row: 3 },
    { id: 's', label: 'S', finger: 'left-ring', row: 3 },
    { id: 'd', label: 'D', finger: 'left-middle', row: 3 },
    { id: 'f', label: 'F', finger: 'left-index', row: 3 },
    { id: 'g', label: 'G', finger: 'left-index-extended', row: 3 },
    { id: 'h', label: 'H', finger: 'right-index-extended', row: 3 },
    { id: 'j', label: 'J', finger: 'right-index', row: 3 },
    { id: 'k', label: 'K', finger: 'right-middle', row: 3 },
    { id: 'l', label: 'L', finger: 'right-ring', row: 3 },
    { id: 'ccedil', label: 'Ç', finger: 'right-pinky', row: 3 },
    { id: 'tilde', label: '~', upperLabel: '^', finger: 'right-pinky', row: 3 },
    { id: 'closebracket', label: ']', upperLabel: '}', finger: 'right-pinky', row: 3, width: 1.2 }
  );

  keys.push(
    { id: 'shiftleft', label: 'Shift', finger: 'left-pinky', row: 4, width: 1.3 },
    { id: 'backslash', label: '\\', upperLabel: '|', finger: 'left-pinky', row: 4 },
    { id: 'z', label: 'Z', finger: 'left-pinky', row: 4 },
    { id: 'x', label: 'X', finger: 'left-ring', row: 4 },
    { id: 'c', label: 'C', finger: 'left-middle', row: 4 },
    { id: 'v', label: 'V', finger: 'left-index', row: 4 },
    { id: 'b', label: 'B', finger: 'left-index-extended', row: 4 },
    { id: 'n', label: 'N', finger: 'right-index-extended', row: 4 },
    { id: 'm', label: 'M', finger: 'right-index', row: 4 },
    { id: 'comma', label: ',', upperLabel: '<', finger: 'right-middle', row: 4 },
    { id: 'period', label: '.', upperLabel: '>', finger: 'right-ring', row: 4 },
    { id: 'semicolon', label: ';', upperLabel: ':', finger: 'right-pinky', row: 4 },
    { id: 'slash', label: '/', upperLabel: '?', finger: 'right-pinky', row: 4 },
    { id: 'shiftright', label: 'Shift', finger: 'right-pinky', row: 4, width: 2 }
  );

  keys.push(
    { id: 'ctrlleft', label: 'Ctrl', finger: 'left-pinky', row: 5, width: 1.5 },
    { id: 'altleft', label: 'Alt', finger: 'left-pinky', row: 5, width: 1.5 },
    { id: 'space', label: '', finger: 'thumb', row: 5, width: 7 },
    { id: 'altright', label: 'Alt', finger: 'right-pinky', row: 5, width: 1.5 },
    { id: 'ctrlright', label: 'Ctrl', finger: 'right-pinky', row: 5, width: 1.5 }
  );

  return keys;
}
