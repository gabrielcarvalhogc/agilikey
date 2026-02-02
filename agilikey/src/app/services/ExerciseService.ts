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
      title: 'Exercício simples',
      text: [
        'a s d f j k l ç aa ss dd ff jj kk ll çç as df jk lç sa fd kj çl asdf jklç fdsa çlkj çala sala fasa lasça salsa safada fala çasa lasça',
        'ala sala fala dala jaça faça çada dada fada laça saça kala çala assa lassa fafa jaja kaka lala',
        'aj sk dl fç ja ks ld çf asdf çlkj ajs skd dlf fçl alak saka dala faja lasa'
      ],
      description: 'Teclas A S D F J K L Ç'
    },
    {
      id: 2,
      title: 'Teclas G e H',
      text: [
        'g g g g h h h h gh hg gh hg gg hh fg gf dg sg jh hj kh lh çh as df jk lç sa fd hg kj çl asdfg gh hjklç fdsa hg çlkj çala faga sala lasça salsa safada falas hagas çalgas',
        'haja gaja gola galo gago halas hagas çhaga lha lho alho galho falha çalha saga vaga',
        'asdfg hjklç gfdsa hlkjç gfhj hgfd gjhk glçk ghgh hghg fghj jhgf gas has das fas'
      ],
      description: 'Acrescentando as teclas G H'
    },
    {
      id: 3,
      title: 'Teclas E e I',
      text: [
        'e e e e i i i i ei ie ei ie ee ii fe ef de ed se es ki ik li il çi iç dede sede fefe kiki lili lele dide sidi fiji elise seide lide glide',
        'ele ela dia tia lia çia fia via ide iai lei sei dei feio feia leia çeia meia veia',
        'a ideia e a lei ele le a lida a ilha e bela cada dia ela fala se ela diz ele faz'
      ],
      description: 'Acrescentando as teclas E e I (dedos médios)'
    },
    {
      id: 4,
      title: 'Teclas R e U',
      text: [
        'r r r r u u u u ru ur ru ur rr uu fr rf dr rd sr rs ju uj ku uk lu ul çu uç rua rudo rude fura jura lura sura urso ruge ruga rugas fugas',
        'furar jurar çurar usar rugar rugir surgir fugir urrar arara rara cara aura fura surra',
        'a rua e suja a cara e rara o urso ruge a praga urge sururu no cais rir e curar a dor'
      ],
      description: 'Acrescentando as teclas R e U (dedos indicadores)'
    },
    {
      id: 5,
      title: 'Teclas T e Y',
      text: [
        't t t t y y y y ty yt ty yt tt yy ft tf dt td st ts jy yj ky yk ly yl çy yç tato teto tudo tido tuas tuas rute rita tati tatu tutu yeti',
        'yeti yoga yak tati tatu tite trato treta trote triste truta try toscana tostar testar total',
        'tudo isto e teu trata de tudo tente ter tato na lida o teto caiu o tio riu a tia viu'
      ],
      description: 'Acrescentando as teclas T e Y (extensão dos indicadores)'
    },
    {
      id: 6,
      title: 'Exercício livre',
      text: [
        'Hoje, o dia está lindo para caminhar no parque e tomar uma água de coco bem gelada!',
        'Preciso ir ao mercado comprar: pão, leite, ovos, manteiga e café para o café da manhã.',
        'O cachorro correu atrás da bola e brincou muito com as crianças no jardim de casa; foi uma festa.',
        'O sucesso nasce do querer, da determinação e da persistência em se chegar a um objetivo.',
        'Não deixe que o medo de errar te impeça de tentar, voar alto e alcançar seus sonhos!',
        'A persistência é o caminho do êxito; lembre-se: cada erro é apenas uma chance de aprender mais.',
        'Minha terra tem palmeiras, Onde canta o Sabiá; As aves, que aqui gorjeiam, Não gorjeiam como lá.',
        'Amor é fogo que arde sem se ver, é ferida que dói e não se sente; é um contentamento descontente.',
        'Tudo vale a pena se a alma não é pequena. Quem quer passar além do Bojador, tem que passar além da dor.'
      ],
      description: 'Exercício livre para praticar todas as teclas'
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
