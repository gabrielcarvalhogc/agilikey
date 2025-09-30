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
    component.targetText = 'teste'; // Força o texto após reset
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
});
