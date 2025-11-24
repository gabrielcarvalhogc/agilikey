import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TimerService {
  private startTime?: number;
  private elapsedMs = 0;
  private running = false;

  start() {
    if (!this.running) {
      this.startTime = Date.now();
      this.running = true;
    }
  }

  stop() {
    if (this.running && this.startTime) {
      this.elapsedMs += Date.now() - this.startTime;
      this.running = false;
    }
  }

  reset() {
    this.running = false;
    this.startTime = undefined;
    this.elapsedMs = 0;
  }

  getSeconds(): number {
    if (this.running && this.startTime) {
      return Math.floor((this.elapsedMs + (Date.now() - this.startTime)) / 1000);
    }
    return Math.floor(this.elapsedMs / 1000);
  }

  format(): string {
    const totalSec = this.getSeconds();
    const mm = String(Math.floor(totalSec / 60)).padStart(2, '0');
    const ss = String(totalSec % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  }
}
