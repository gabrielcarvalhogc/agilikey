import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';

export interface ScoreData {
  wpm: number;
  accuracy: number | string;
  tempo: string;
  incorrect: number;
}

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [Dialog, ButtonModule, DividerModule],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss'
})
export class ScoreboardComponent {

  visible: boolean = false;
  stats: ScoreData = { wpm: 0, accuracy: 0, tempo: '00:00', incorrect: 0};

  showDialog(data: ScoreData) {
    this.stats = data;
    this.visible = true;
  }

  reset() {
    this.visible = false;
  }
}
