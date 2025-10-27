import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleKeyboardComponent } from './simple-keyboard.component';

describe('SimpleKeyboardComponent', () => {
  let component: SimpleKeyboardComponent;
  let fixture: ComponentFixture<SimpleKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleKeyboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change value when onChange is called',() => {
    component.onChange('teste');
    expect(component.value).toBe('teste');
  });

  it('should handle different types of text', () => {
    const inputs = ['12345', '!@#$', 'áéíóú', 'Hello World'];
    for (const input of inputs) {
      component.onChange(input);
      expect(component.value).toBe(input);
    }
  });

  it('should call onKeyPress on key press',() => {
    jest.spyOn(component, 'onKeyPress');
    component.onKeyPress('a');
    component.onKeyPress('b');
    component.onKeyPress('c');

    expect(component.onKeyPress).toHaveBeenCalled();
    expect(component.onKeyPress).toHaveBeenCalledTimes(3);
  });

  it('should call handleShift on shift ou capslock key press', () => {
    jest.spyOn(component, 'handleShift');
    component.onKeyPress('{shift}');
    component.onKeyPress('{lock}');
    expect(component.handleShift).toHaveBeenCalled();
    expect(component.handleShift).toHaveBeenCalledTimes(2);
  });

  it('should get correct value from onInputChange', () => {
    const event = { target: { value: 'teste' } };
    jest.spyOn(component.keyboard, 'setInput');
    component.onInputChange(event);
    expect(component.keyboard.setInput).toHaveBeenCalledWith('teste');
  });
});
