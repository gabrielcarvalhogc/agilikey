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
      expect(component.targetText.length).toBeGreaterThan(0);
    });

    it('should tipe correct word', () => {
      for (const char of word) {
        const event = new KeyboardEvent('keydown', { key: char });
        globalThis.dispatchEvent(event);
        fixture.detectChanges();
      }

      expect(component.typedText).toBe(word);
    });

    it('should increment correct when a correct letter is pressed', () => {
      component.targetText = word;

      for (const char of word) {
        const event = new KeyboardEvent('keydown', { key: char });
        globalThis.dispatchEvent(event);
        fixture.detectChanges();
      }

      expect(component.typedText).toBe(word);
      expect(component.stats.correct).toBe(word.length);
    });

    it('should increment correct when a correct letter is pressed', () => {
      component.targetText = word;

      const wrongWord = 'tast';
      for (const char of wrongWord) {
        const event = new KeyboardEvent('keydown', { key: char });
        globalThis.dispatchEvent(event);
        fixture.detectChanges();
      }

      expect(component.typedText).toBe(wrongWord);
      expect(component.stats.correct).toBe(3);
      expect(component.stats.incorrect).toBe(1);
    });
});
