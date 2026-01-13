import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Exercise } from '../shared/models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private readonly exercises: Exercise[] = [
    {
      id: 1,
      title: 'Teste',
      text: 'O rato roeu a roupa do rei de Roma',
      description: 'Exercício de teste'
    },
    {
      id: 2,
      title: 'Exercício simples',
      text: 'a s d f j k l ç aa ss dd ff jj kk ll çç as df jk lç sa fd kj çl asdf jklç fdsa çlkj çala sala fasa lasça salsa safada fala çasa lasça',
      description: 'Teclas A S D F J K L Ç'
    },
    {
      id: 3,
      title: 'Teclas G e H',
      text: 'g g g g h h h h gh hg gh hg gg hh fg gf dg sg jh hj kh lh çh as df jk lç sa fd hg kj çl asdfg gh hjklç fdsa hg çlkj çala faga sala lasça salsa safada falas hagas çalgas',
      description: 'Acrescentando as teclas G H'
    }
  ];

  private readonly currentExerciseSubject = new BehaviorSubject<Exercise>(this.exercises[0]);
  currentExercise$ = this.currentExerciseSubject.asObservable();

  constructor() { }

  getExercises(): Exercise[] {
    return this.exercises;
  }

  selectExercise(exercise: Exercise) {
    this.currentExerciseSubject.next(exercise);
  }
}
