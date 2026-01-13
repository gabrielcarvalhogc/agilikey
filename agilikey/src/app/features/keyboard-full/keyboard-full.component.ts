import { Component, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TypingStats } from '../../shared/keyboard/key-types';
import { SimpleKeyboardComponent } from "../simple-keyboard/simple-keyboard.component";
import { TimerService } from '../../services/TimerService';
import { calculateAccuracy, calculateWPM } from '../../shared/utils/calculateStats';
import { ScoreboardComponent } from "../scoreboard/scoreboard.component";
import { ExerciseService } from '../../services/ExerciseService';

@Component({
  selector: 'app-keyboard-full',
  standalone: true,
  imports: [CommonModule, FormsModule, SimpleKeyboardComponent, ScoreboardComponent],
  templateUrl: './keyboard-full.component.html',
  styleUrl: './keyboard-full.component.scss',
})
export class KeyboardFullComponent implements OnInit, OnDestroy {
  @ViewChild('scoreboard') scoreboard!: ScoreboardComponent;

  private readonly exerciseService = inject(ExerciseService);
  private exerciseSubscription?: Subscription;

  targetText = '';
  typedText = '';
  fullTyped = '';
  currentIndex = 0;
  characterStates: ('pending' | 'correct' | 'incorrect')[] = [];
  stats: TypingStats = { correct: 0, incorrect: 0, wpm: 0 };
  accuracy: number = 100;
  displayTime: string = '00:00';

  private totalErrors = 0;
  private previousLength = 0;
  private totalKeystrokesTyped = 0;
  private updateInterval: any;
  private isRunning = false;

  constructor(readonly timer: TimerService) { }

  ngOnInit() {
    this.exerciseSubscription = this.exerciseService.currentExercise$.subscribe(ex => {
      this.targetText = ex.text;
      this.resetExercise();
    });
  }

  ngOnDestroy() {
    this.stopUpdateLoop();
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

  onInputChange() {
    if (!this.isRunning) {
      this.timer.start();
      this.startUpdateLoop();
      this.isRunning = true;
    }

    this.updateLiveStats();

    const combined = this.fullTyped + this.typedText;
    const currentLength = combined.length;

    const isTyping = currentLength > this.previousLength;

    if (isTyping) {
      this.totalKeystrokesTyped++;

      const lastTypedIndex = currentLength - 1;
      const expectedChar = this.targetText[lastTypedIndex];
      const typedChar = combined[lastTypedIndex];

      if (typedChar !== expectedChar) {
        this.totalErrors++;
      }
    }

    this.previousLength = currentLength;
    this.updateCharacterStates(combined);
    this.updateStats();

    if (this.shouldClearInput()) {
      this.fullTyped += this.typedText;
      this.typedText = '';
    }

    if (this.currentIndex >= this.targetText.length) this.completeExercise();
  }

  private startUpdateLoop() {
    this.stopUpdateLoop();
    this.updateInterval = setInterval(() => {
      this.displayTime = this.timer.format();
      this.updateLiveStats();
    }, 500);
  }

  private stopUpdateLoop() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  private updateLiveStats() {
    const elapsedMinutes = this.timer.getSeconds() / 60;
    if (elapsedMinutes > 0) {
      this.stats.wpm = calculateWPM(this.stats.correct, this.totalErrors, elapsedMinutes);
    }
    this.accuracy = calculateAccuracy(this.stats.correct, this.stats.correct + this.stats.incorrect);
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
    this.stats.incorrect = this.totalErrors;
  }

  private shouldClearInput(): boolean {
    const lastChar = this.typedText.at(-1);
    return lastChar === ' ';
  }

  private completeExercise() {
    this.timer.stop();
    this.stopUpdateLoop();
    this.isRunning = false;
    this.displayTime = this.timer.format();

    this.scoreboard.visible = true;
    this.scoreboard.showDialog({
      wpm: this.stats.wpm,
      accuracy: this.accuracy,
      tempo: this.displayTime,
      incorrect: this.totalErrors,
    });
    this.resetExercise();
  }

  resetExercise() {
    this.timer.reset();
    this.stopUpdateLoop();
    this.isRunning = false;
    this.displayTime = '00:00';
    this.typedText = '';
    this.fullTyped = '';
    this.currentIndex = 0;
    this.accuracy = 100;
    this.stats = { correct: 0, incorrect: 0, wpm: 0 };
    this.characterStates = new Array(this.targetText.length).fill('pending');
    this.totalErrors = 0;
    this.previousLength = 0;
    this.totalKeystrokesTyped = 0;
  }
}
