import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Key {
  id: string;
  label: string;
  upperLabel?: string;
  finger: string;
  row: number;
  width?: number;
}

interface TypingStats {
  correct: number;
  incorrect: number;
  wpm: number;
}

@Component({
  selector: 'app-keyboard-full',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keyboard-full.component.html',
  styleUrl: './keyboard-full.component.scss',
})

export class KeyboardFullComponent implements OnInit, OnDestroy {
  keys: Key[] = [];
  pressedKeys = new Set<string>();

  targetText = 'o rato roeu a roupa do rei de roma';
  typedText = '';
  currentIndex = 0;

  stats: TypingStats = {
    correct: 0,
    incorrect: 0,
    wpm: 0
  };

  private startTime?: number;
  private readonly exercises = [
    'o rato roeu a roupa do rei de roma',
    'a pratica leva a perfeicao',
    'devagar e sempre se vai longe',
    'quem tem boca vai a roma',
    'mais vale um passaro na mao que dois voando',
    'agua mole em pedra dura tanto bate ate que fura'
  ];

  ngOnInit() {
    this.initializeKeyboard();
    this.resetExercise();
  }

  ngOnDestroy() {}

  initializeKeyboard() {
    this.keys.push(
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

    this.keys.push(
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

    this.keys.push(
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

    this.keys.push(
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

    this.keys.push(
      { id: 'ctrlleft', label: 'Ctrl', finger: 'left-pinky', row: 5, width: 1.5 },
      { id: 'altleft', label: 'Alt', finger: 'left-pinky', row: 5, width: 1.5 },
      { id: 'space', label: '', finger: 'thumb', row: 5, width: 7 },
      { id: 'altright', label: 'Alt', finger: 'right-pinky', row: 5, width: 1.5 },
      { id: 'ctrlright', label: 'Ctrl', finger: 'right-pinky', row: 5, width: 1.5 }
    );
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();

    const keyId = this.getKeyId(event);
    if (keyId) {
      this.pressedKeys.add(keyId);
      this.handleTyping(event.key);
    }
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    const keyId = this.getKeyId(event);
    if (keyId) {
      this.pressedKeys.delete(keyId);
    }
  }

  private getKeyId(event: KeyboardEvent): string | null {
    const key = event.key.toLowerCase();

    if (key === ' ') return 'space';
    if (key === 'backspace') return 'backspace';
    if (key === 'enter') return 'enter';
    if (key === 'tab') return 'tab';
    if (key === 'shift') return event.location === 1 ? 'shiftleft' : 'shiftright';
    if (key === 'control') return event.location === 1 ? 'ctrlleft' : 'ctrlright';
    if (key === 'alt') return event.location === 1 ? 'altleft' : 'altright';

    if (key.length === 1 && /[a-z]/.exec(key)) return key;

    const specialChars: { [key: string]: string } = {
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

    return specialChars[key] || null;
  }

  private handleTyping(key: string) {
    if (!this.startTime) {
      this.startTime = Date.now();
    }

    if (key === 'Backspace') {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.typedText = this.typedText.slice(0, -1);
      }
      return;
    }

    if (this.currentIndex >= this.targetText.length) {
      return;
    }

    this.typedText += key;
    const isCorrect = key === this.targetText[this.currentIndex];

    if (isCorrect) {
      this.stats.correct++;
    } else {
      this.stats.incorrect++;
    }

    this.currentIndex++;
    this.updateWPM();

    if (this.currentIndex === this.targetText.length) {
      this.completeExercise();
    }
  }

  private updateWPM() {
    if (!this.startTime) return;

    const minutes = (Date.now() - this.startTime) / 60000;
    const words = this.currentIndex / 5; // Média de 5 caracteres por palavra
    this.stats.wpm = Math.round(words / minutes);
  }

  private completeExercise() {
    setTimeout(() => {
      alert(`Exercício completo!\nPrecisão: ${this.getAccuracy()}%\nPPM: ${this.stats.wpm}`);
      this.resetExercise();
    }, 500);
  }

  resetExercise() {
    this.targetText = this.exercises[Math.floor(Math.random() * this.exercises.length)];
    this.typedText = '';
    this.currentIndex = 0;
    this.stats = { correct: 0, incorrect: 0, wpm: 0 };
    this.startTime = undefined;
  }

  getAccuracy(): number {
    const total = this.stats.correct + this.stats.incorrect;
    if (total === 0) return 100;
    return Math.round((this.stats.correct / total) * 100);
  }

  getNextKeyToPress(): string | null {
    if (this.currentIndex >= this.targetText.length) return null;

    const nextChar = this.targetText[this.currentIndex].toLowerCase();

    if (nextChar === ' ') return 'space';
    if (nextChar === 'ç') return 'ccedil';

    const specialChars: { [key: string]: string } = {
      ',': 'comma',
      '.': 'period',
      ';': 'semicolon',
      '/': 'slash',
      "'": 'quote',
      '-': 'minus'
    };

    return specialChars[nextChar] || nextChar;
  }

  getKeysForRow(row: number): Key[] {
    return this.keys.filter(key => key.row === row);
  }
}
