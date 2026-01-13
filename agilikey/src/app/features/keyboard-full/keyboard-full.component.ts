import { Component, OnInit, OnDestroy, ViewChild, inject, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TypingStats } from '../../shared/keyboard/key-types';
import { SimpleKeyboardComponent } from "../simple-keyboard/simple-keyboard.component";
import { TimerService } from '../../services/TimerService';
import { calculateWPM } from '../../shared/utils/calculateStats';
import { ScoreboardComponent } from "../scoreboard/scoreboard.component";
import { ExerciseService } from '../../services/ExerciseService';

@Component({
  selector: 'app-keyboard-full',
  standalone: true,
  imports: [CommonModule, FormsModule, SimpleKeyboardComponent, ScoreboardComponent],
  templateUrl: './keyboard-full.component.html',
  styleUrl: './keyboard-full.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyboardFullComponent implements OnInit, OnDestroy {
  @ViewChild('scoreboard') scoreboard!: ScoreboardComponent;

  private readonly exerciseService = inject(ExerciseService);
  private exerciseSubscription?: Subscription;

  stats = signal<TypingStats>({ correct: 0, incorrect: 0, wpm: 0 });
  displayTime = signal<string>('00:00');

  accuracy = computed(() => {
    const s = this.stats();
    const total = s.correct + s.incorrect;
    return total === 0 ? 100 : Math.round((s.correct / total) * 100);
  });

  characterStates = signal<('pending' | 'correct' | 'incorrect')[]>([]);
  targetChars = signal<string[]>([]);

  targetText = '';
  typedText = '';
  fullTyped = '';
  currentIndex = 0;

  private totalErrors = 0;
  private previousLength = 0;
  private totalKeystrokesTyped = 0;
  private updateInterval: any;
  private isRunning = false;

  constructor(readonly timer: TimerService) { }

  ngOnInit() {
    this.exerciseSubscription = this.exerciseService.currentExercise$.subscribe(ex => {
      this.targetText = ex.text;
      this.targetChars.set(ex.text.split(''));
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
    this.ensureTimerRunning();
    const combined = this.fullTyped + this.typedText;
    this.processKeystrokeLogic(combined);
    this.updateCharacterStates(combined);
    this.updateStats();
    this.handleInputCycle();
  }

  private ensureTimerRunning() {
    if (!this.isRunning) {
      this.timer.start();
      this.startUpdateLoop();
      this.isRunning = true;
    }
  }

  private processKeystrokeLogic(combined: string) {
    const currentLength = combined.length;
    const isTypingNewChar = currentLength > this.previousLength;

    if (isTypingNewChar) {
      this.totalKeystrokesTyped++;
      const lastTypedIndex = currentLength - 1;

      if (lastTypedIndex < this.targetText.length) {
        const expectedChar = this.targetText[lastTypedIndex];
        const typedChar = combined[lastTypedIndex];

        if (typedChar !== expectedChar) {
          this.totalErrors++;
        }
      }
    }
    this.previousLength = currentLength;
  }

  private updateCharacterStates(combined: string) {
    const newStates = this.targetText.split('').map((char, i) => {
      if (i >= combined.length) return 'pending';
      if (combined[i] === char) return 'correct';
      return 'incorrect';
    });

    this.characterStates.set(newStates as any);
    this.currentIndex = combined.length;
  }

  private updateStats() {
    const correctCount = this.characterStates().filter(c => c === 'correct').length;

    this.stats.update(current => ({
      ...current,
      correct: correctCount,
      incorrect: this.totalErrors
    }));

    this.updateLiveWPM();
  }

  private handleInputCycle() {
    if (this.shouldClearInput()) {
      this.fullTyped += this.typedText;
      this.typedText = '';
    }

    if (this.currentIndex >= this.targetText.length) {
      this.completeExercise();
    }
  }

  private startUpdateLoop() {
    this.stopUpdateLoop();
    this.updateInterval = setInterval(() => {
      this.displayTime.set(this.timer.format());
      this.updateLiveWPM();
    }, 500);
  }

  private stopUpdateLoop() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  private updateLiveWPM() {
    const elapsedMinutes = this.timer.getSeconds() / 60;
    if (elapsedMinutes > 0) {
      const newWpm = calculateWPM(this.stats().correct, this.totalErrors, elapsedMinutes);
      this.stats.update(s => ({ ...s, wpm: newWpm }));
    }
  }

  private shouldClearInput(): boolean {
    const lastChar = this.typedText.at(-1);
    return lastChar === ' ';
  }

  private completeExercise() {
    this.timer.stop();
    this.stopUpdateLoop();
    this.isRunning = false;
    this.displayTime.set(this.timer.format());

    this.scoreboard.visible = true;
    this.scoreboard.showDialog({
      wpm: this.stats().wpm,
      accuracy: this.accuracy(),
      tempo: this.displayTime(),
      incorrect: this.totalErrors,
    });
    this.resetExercise();
  }

  resetExercise() {
    this.timer.reset();
    this.stopUpdateLoop();
    this.isRunning = false;
    this.displayTime.set('00:00');
    this.typedText = '';
    this.fullTyped = '';
    this.currentIndex = 0;
    this.stats.set({ correct: 0, incorrect: 0, wpm: 0 });
    this.characterStates.set(new Array(this.targetText.length).fill('pending'));
    this.totalErrors = 0;
    this.previousLength = 0;
    this.totalKeystrokesTyped = 0;
  }
}
