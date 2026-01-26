import { Component, inject, ViewChild } from '@angular/core';
import { ExerciseService } from '../../services/ExerciseService';
import { Exercise } from '../../shared/models/exercise.model';
import { HelpModalComponent } from "../help-modal/help-modal.component";

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [HelpModalComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  @ViewChild('helpModal') helpModal!: HelpModalComponent;

  private readonly exerciseService = inject(ExerciseService);

  exercises = this.exerciseService.getExercises();

  onSelectExercise(exercise: Exercise) {
    this.exerciseService.selectExercise(exercise);
  }

  showHelpModal() {
    this.helpModal.showDialog();
  }
}
