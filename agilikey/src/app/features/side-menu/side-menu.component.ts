import { Component, inject } from '@angular/core';
import { ExerciseService } from '../../services/ExerciseService';
import { Exercise } from '../../shared/models/exercise.model';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {

  private readonly exerciseService = inject(ExerciseService);

  exercises = this.exerciseService.getExercises();

  onSelectExercise(exercise: Exercise) {
    this.exerciseService.selectExercise(exercise);
  }
}
