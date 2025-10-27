import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TypingStats } from '../../shared/keyboard/key-types';
import { SimpleKeyboardComponent } from "../simple-keyboard/simple-keyboard.component";

@Component({
  selector: 'app-keyboard-full',
  standalone: true,
  imports: [CommonModule, FormsModule, SimpleKeyboardComponent],
  templateUrl: './keyboard-full.component.html',
  styleUrl: './keyboard-full.component.scss',
})
export class KeyboardFullComponent implements OnInit {
  targetText = '';
  typedText = '';
  fullTyped = '';
  currentIndex = 0;
  characterStates: ('pending' | 'correct' | 'incorrect')[] = [];
  stats: TypingStats = { correct: 0, incorrect: 0, wpm: 0 };
  private startTime?: number;

  private readonly exercises = [
    'O rato roeu a roupa do rei de Roma',
    'A prática leva à perfeição',
    'Devagar e sempre se vai longe',
    'Quem tem boca vai a Roma',
    'Mais vale um pássaro na mão que dois voando',
    'Água mole em pedra dura tanto bate até que fura',
  ];

  ngOnInit() {
    this.resetExercise();
  }

  onInputChange() {
    if (!this.startTime) this.startTime = Date.now();

    const combined = this.fullTyped + this.typedText;
    this.updateCharacterStates(combined);
    this.updateStats();
    this.updateWPM();

    if (this.shouldClearInput()) {
      this.fullTyped += this.typedText;
      this.typedText = '';
    }

    if (this.currentIndex >= this.targetText.length) this.completeExercise();
  }

  private updateCharacterStates(combined: string) {
    this.characterStates = this.targetText.split('').map((char, i) => {
      if (i >= combined.length) return 'pending';
      if (combined[i] === char) return 'correct';
      return 'incorrect';
    });
    this.currentIndex = combined.length;
  }

  private updateStats() {
    this.stats.correct = this.characterStates.filter(c => c === 'correct').length;
    this.stats.incorrect = this.characterStates.filter(c => c === 'incorrect').length;
  }

  private shouldClearInput(): boolean {
    const lastChar = this.typedText.at(-1);
    const hasErrors = this.characterStates
      .slice(0, this.fullTyped.length + this.typedText.length)
      .includes('incorrect');
    return lastChar === ' ' && !hasErrors;
  }

  private updateWPM() {
    if (!this.startTime) return;
    const minutes = (Date.now() - this.startTime) / 60000;
    this.stats.wpm = Math.round((this.currentIndex / 5) / minutes);
  }

  private completeExercise() {
    setTimeout(() => {
      alert(`Exercício completo!\nPrecisão: ${this.getAccuracy()}%\nPPM: ${this.stats.wpm}`);
      this.resetExercise();
    }, 300);
  }

  resetExercise() {
    this.targetText = this.randomExercise();
    this.typedText = '';
    this.fullTyped = '';
    this.currentIndex = 0;
    this.stats = { correct: 0, incorrect: 0, wpm: 0 };
    this.startTime = undefined;
    this.characterStates = new Array(this.targetText.length).fill('pending');
  }

  private randomExercise() {
    return this.exercises[Math.floor(Math.random() * this.exercises.length)];
  }

  getAccuracy(): number {
    const total = this.stats.correct + this.stats.incorrect;
    return total ? Math.round((this.stats.correct / total) * 100) : 100;
  }
}
