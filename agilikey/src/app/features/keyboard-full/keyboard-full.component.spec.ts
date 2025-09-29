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
});
