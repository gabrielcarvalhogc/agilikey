import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardFullComponent } from './keyboard-full.component';

describe('KeyboardFullComponent', () => {
  let component: KeyboardFullComponent;
  let fixture: ComponentFixture<KeyboardFullComponent>;
  const word = 'test';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyboardFullComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(KeyboardFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.fullTyped = '';
  });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('initial stats should be 0', () => {
      expect(component.stats.correct).toBe(0);
      expect(component.stats.incorrect).toBe(0);
      expect(component.stats.wpm).toBe(0);
    });

    it('should start with a ramdom text', () => {
      expect(component.targetText).toBeTruthy();
      component.targetText = word;
      component.typedText = '';
      for (let letter of word) {
        component.typedText += letter;
        component.onInputChange();
      }

      expect(component.targetText).toBe(component.typedText);
      expect(component.stats.correct).toBe(word.length);
      expect(component.stats.incorrect).toBe(0);
    });

    it('should increment incorrect when a incorrect letter is pressed', () => {
      component.targetText = word;
      const wrongWord = 'tast';
      component.typedText = '';
      for (let letter of wrongWord) {
        component.typedText += letter;
        component.onInputChange();
      }

      expect(component.targetText).not.toBe(component.typedText);
      expect(component.stats.correct).toBe(word.length - 1);
      expect(component.stats.incorrect).toBe(1);
    });
});
