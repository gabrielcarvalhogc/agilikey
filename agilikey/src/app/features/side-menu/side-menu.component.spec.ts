import { SideMenuComponent } from './side-menu.component';
import { render, screen, fireEvent } from '@testing-library/angular';
import { ExerciseService } from '../../services/ExerciseService';
import '@testing-library/jest-dom';

const mockExercises = [
  { id: 1, title: 'Capoeira', category: 'Luta' },
  { id: 2, title: 'Futebol', category: 'Esporte' }
];

describe('SideMenuComponent', () => {
  let exerciseServiceMock: { getExercises: jest.Mock; selectExercise: jest.Mock };

  beforeEach(() => {
    exerciseServiceMock = {
      getExercises: jest.fn().mockReturnValue(mockExercises),
      selectExercise: jest.fn(),
    };
  });

  const setup = async () => {
    return await render(SideMenuComponent, {
      providers: [
        { provide: ExerciseService, useValue: exerciseServiceMock },
      ],
      componentProviders: [
        { provide: ExerciseService, useValue: exerciseServiceMock },
      ]
    });
  };

  it('deve renderizar os exercícios do MOCK (Capoeira/Futebol)', async () => {
    await setup();

    expect(exerciseServiceMock.getExercises).toHaveBeenCalled();
    expect(screen.getByText('Capoeira')).toBeInTheDocument();
    expect(screen.getByText('Futebol')).toBeInTheDocument();
  });

  it('deve chamar o selectExercise ao clicar', async () => {
    await setup();

    const item = screen.getByText('Capoeira');

    fireEvent.click(item);

    expect(exerciseServiceMock.selectExercise).toHaveBeenCalledWith(mockExercises[0]);
  });
});
