import { FormsModule } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { KeyboardFullComponent } from './keyboard-full.component';
import { ExerciseService } from '../../services/ExerciseService';
import { TimerService } from '../../services/TimerService';
import { BehaviorSubject } from 'rxjs';
import { Component, Input } from '@angular/core';
import '@testing-library/jest-dom';

const mockExerciseSubject = new BehaviorSubject({
  id: 1,
  title: 'Teste',
  text: 'Texto de Teste'
});

const exerciseServiceMock = {
  currentExercise$: mockExerciseSubject.asObservable(),
  selectExercise: jest.fn()
};

const timerServiceMock = {
  start: jest.fn(),
  stop: jest.fn(),
  reset: jest.fn(),
  format: jest.fn().mockReturnValue('00:00'),
  getSeconds: jest.fn().mockReturnValue(0)
};

@Component({ selector: 'app-simple-keyboard', standalone: true, template: '<div>Keyboard Mock</div>' })
class MockSimpleKeyboardComponent {}

@Component({ selector: 'app-scoreboard', standalone: true, template: '<div>Scoreboard Mock</div>' })
class MockScoreboardComponent {
  @Input() visible = false;
  showDialog = jest.fn();
}

describe('KeyboardFullComponent', () => {
  const setup = async () => {
    const user = userEvent.setup();
    const view = await render(KeyboardFullComponent, {
      componentImports: [MockSimpleKeyboardComponent, MockScoreboardComponent, FormsModule],
      providers: [
        { provide: ExerciseService, useValue: exerciseServiceMock },
        { provide: TimerService, useValue: timerServiceMock }
      ]
    });
    return { user, view };
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockExerciseSubject.next({ id: 1, title: 'Teste', text: 'Texto de Teste' });
  });

  it('deve renderizar o texto do exercício inicial vindo do serviço', async () => {
    await setup();

    expect(screen.getByText('T', { selector: '.current' })).toBeInTheDocument();
    expect(screen.getByText('Corretas:').parentElement).toHaveTextContent('0');
    expect(screen.getByText('Erros:').parentElement).toHaveTextContent('0');
  });

  it('deve marcar o caractere como correto e atualizar stats ao digitar certo', async () => {
    const { user } = await setup();
    const input = screen.getByPlaceholderText('Digite aqui...');

    await user.type(input, 'T');

    expect(timerServiceMock.start).toHaveBeenCalled();
    expect(screen.getByText('Corretas:').parentElement).toHaveTextContent('1');
  });

  it('deve marcar o caractere como incorreto e contar erro ao digitar errado', async () => {
    const { user } = await setup();
    const input = screen.getByPlaceholderText('Digite aqui...');

    await user.type(input, 'X');

    const spans = screen.getAllByText((content, element) => element?.tagName.toLowerCase() === 'span' && element.parentElement?.className === 'target-text');
    expect(spans[0]).toHaveClass('incorrect');
    expect(screen.getByText('Erros:').parentElement).toHaveTextContent('1');
    expect(screen.getByText('Corretas:').parentElement).toHaveTextContent('0');
  });

  it('deve limpar o input ao digitar espaço (comportamento de shouldClearInput)', async () => {
    mockExerciseSubject.next({ id: 1, title: 'Teste', text: 'A B' });
    const { user } = await setup();

    const input = screen.getByPlaceholderText('Digite aqui...') as HTMLInputElement;
    await user.type(input, 'A ');

    expect(input.value).toBe('');
    expect(screen.getByText('Corretas:').parentElement).toHaveTextContent('2');
  });

  it('deve completar o exercício e chamar o scoreboard ao terminar o texto', async () => {
    mockExerciseSubject.next({ id: 1, title: 'Fim', text: 'Oi' });
    const { user, view } = await setup();
    const input = screen.getByPlaceholderText('Digite aqui...');

    await user.type(input, 'Oi');
    const keyboardComponent = view.fixture.componentInstance;

    expect(timerServiceMock.stop).toHaveBeenCalled();
    expect(keyboardComponent.scoreboard.showDialog).toHaveBeenCalled();
    expect(timerServiceMock.reset).toHaveBeenCalled();
  });

  it('botão de reset deve zerar tudo', async () => {
    const { user } = await setup();
    const input = screen.getByPlaceholderText('Digite aqui...');

    await user.type(input, 'T');
    expect(screen.getByText('Corretas:').parentElement).toHaveTextContent('1');
    const resetBtn = screen.getByText('Novo Exercício');
    await user.click(resetBtn);

    expect(screen.getByText('Corretas:').parentElement).toHaveTextContent('0');
    expect(timerServiceMock.reset).toHaveBeenCalled();
  });
});
