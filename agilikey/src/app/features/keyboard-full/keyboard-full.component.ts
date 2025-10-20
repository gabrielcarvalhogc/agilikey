import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Key, TypingStats } from '../../shared/keyboard/key-types';
import { getKeyId } from '../../shared/utils/get-key-id';
import { SimpleKeyboardComponent } from "../simple-keyboard/simple-keyboard.component";

@Component({
  selector: 'app-keyboard-full',
  standalone: true,
  imports: [CommonModule, SimpleKeyboardComponent],
  templateUrl: './keyboard-full.component.html',
  styleUrl: './keyboard-full.component.scss',
})
export class KeyboardFullComponent implements OnInit {
  keys: Key[] = [];
  pressedKeys = new Set<string>();

  targetText = 'o rato roeu a roupa do rei de roma';
  typedText = '';
  currentIndex = 0;
  characterStates: ('pending' | 'correct' | 'incorrect')[] = [];

  stats: TypingStats = {
    correct: 0,
    incorrect: 0,
    wpm: 0
  };

  private startTime?: number;
  private readonly exercises = [
    'O Rato roeu a roupa do rei de roma',
    'A Prática leva a perfeição',
    'Devagar e Sempre se vai longe',
    'quem tem boca vai a roma',
    'mais vale um passaro na mao que dois voando',
    'agua mole em pedra dura tanto bate ate que fura',
  ];

  ngOnInit() {
    this.resetExercise();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();

    const keyId = getKeyId(event);
    if (keyId) {
      this.pressedKeys.add(keyId);
      this.handleTyping(event.key);
    }
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    const keyId = getKeyId(event);
    if (keyId) {
      this.pressedKeys.delete(keyId);
    }
  }

  private handleTyping(key: string) {
    if (key === 'Shift') return;

    if (!this.startTime) {
      this.startTime = Date.now();
    }

    if (key === 'Backspace') {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.typedText = this.typedText.slice(0, -1);
        this.characterStates[this.currentIndex] = 'pending';
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
      this.characterStates[this.currentIndex] = 'correct';
    } else {
      this.stats.incorrect++;
      this.characterStates[this.currentIndex] = 'incorrect';
    }

    this.currentIndex++;
    this.updateWPM();

    if (this.currentIndex === this.targetText.length) {
      this.completeExercise();
    }
    console.log(this.typedText);
  }

  private updateWPM() {
    if (!this.startTime) return;

    const minutes = (Date.now() - this.startTime) / 60000;
    const words = this.currentIndex / 5;
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
    this.characterStates = new Array(this.targetText.length).fill('pending');
  }

  getAccuracy(): number {
    const total = this.stats.correct + this.stats.incorrect;
    if (total === 0) return 100;
    return Math.round((this.stats.correct / total) * 100);
  }
}
