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
    },
    {
      id: 4,
      title: 'Teclas E e I',
      text: 'e e e e i i i i ei ie ei ie ee ii fe ef de ed se es ki ik li il çi iç dede sede fefe kiki lili lele dide sidi fiji elise seide lide glide',
      description: 'Acrescentando as teclas E e I (dedos médios)'
    },
    {
      id: 5,
      title: 'Teclas R e U',
      text: 'r r r r u u u u ru ur ru ur rr uu fr rf dr rd sr rs ju uj ku uk lu ul çu uç rua rudo rude fura jura lura sura urso ruge ruga rugas fugas',
      description: 'Acrescentando as teclas R e U (dedos indicadores)'
    },
    {
      id: 6,
      title: 'Teclas T e Y',
      text: 't t t t y y y y ty yt ty yt tt yy ft tf dt td st ts jy yj ky yk ly yl çy yç tato teto tudo tido tuas tuas rute rita tati tatu tutu yeti',
      description: 'Acrescentando as teclas T e Y (extensão dos indicadores)'
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
