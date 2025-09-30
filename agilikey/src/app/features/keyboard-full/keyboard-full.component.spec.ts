import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardFullComponent } from './keyboard-full.component';

describe('KeyboardFullComponent', () => {
  let component: KeyboardFullComponent;
  let fixture: ComponentFixture<KeyboardFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyboardFullComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(KeyboardFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar com estatísticas zeradas', () => {
    expect(component.stats.correct).toBe(0);
    expect(component.stats.incorrect).toBe(0);
    expect(component.stats.wpm).toBe(0);
  });

  it('deve carregar um texto aleatório para prática', () => {
    expect(component.targetText).toBeTruthy();
    expect(component.targetText.length).toBeGreaterThan(0);
  });

  it('deve digitar a palavra completa corretamente', () => {
    component.targetText = 'teste';
    component.resetExercise();
    component.targetText = 'teste';
    fixture.detectChanges();
    const word = 'teste';

    for (const char of word) {
      const event = new KeyboardEvent('keydown', { key: char });
      window.dispatchEvent(event);
      fixture.detectChanges();
    }

    expect(component.typedText).toBe(word);
    expect(component.stats.correct).toBe(5);
    expect(component.stats.incorrect).toBe(0);
    expect(component.getAccuracy()).toBe(100);
  });

  it('deve mostrar a letra atual com underline', () => {
    component.targetText = 'teste';
    component.resetExercise();
    component.targetText = 'teste';
    fixture.detectChanges();
    const word = 'teste';

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const event = new KeyboardEvent('keydown', { key: char });
      window.dispatchEvent(event);
      fixture.detectChanges();

      expect(component.currentIndex).toBe(i + 1);
      expect(component.characterStates[i]).toBe('correct');
      expect(component.characterStates[i + 1]).toBe('pending');
    }
  });

  it('deve marcar letras corretas com o estado "correct" (classe CSS) e atualizar as estatísticas apropriadamente', () => {
    component.targetText = 'abc';
    component.resetExercise();
    component.targetText = 'abc';
    fixture.detectChanges();
    const word = 'abc';

    for (const char of word) {
      const event = new KeyboardEvent('keydown', { key: char });
      window.dispatchEvent(event);
      fixture.detectChanges();
    }

    expect(component.typedText).toBe(word);
    expect(component.stats.correct).toBe(3);
    expect(component.stats.incorrect).toBe(0);
    expect(component.getAccuracy()).toBe(100);
    expect(component.characterStates[0]).toEqual('correct');
    expect(component.characterStates[1]).toEqual('correct');
    expect(component.characterStates[2]).toEqual('correct');
    expect(component.characterStates[3]).toEqual('pending');
  });

  it('deve marcar letras incorretas com o estado "incorrect" (classe CSS) e atualizar as estatísticas apropriadamente', () => {
    component.targetText = 'abc';
    component.resetExercise();
    component.targetText = 'abc';
    fixture.detectChanges();
    const word = 'abd';

    for (const char of word) {
      const event = new KeyboardEvent('keydown', { key: char });
      window.dispatchEvent(event);
      fixture.detectChanges();
    }

    expect(component.typedText).toBe(word);
    expect(component.stats.correct).toBe(2);
    expect(component.stats.incorrect).toBe(1);
    expect(component.getAccuracy()).toBe(67);
    expect(component.characterStates[0]).toEqual('correct');
    expect(component.characterStates[1]).toEqual('correct');
    expect(component.characterStates[2]).toEqual('incorrect');
    expect(component.characterStates[3]).toEqual('pending');
  });
});
