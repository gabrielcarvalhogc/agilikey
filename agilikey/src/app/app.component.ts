import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KeyboardFullComponent } from "./features/keyboard-full/keyboard-full.component";
import { SimpleKeyboardComponent } from './features/simple-keyboard/simple-keyboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, KeyboardFullComponent, SimpleKeyboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Agilikey';
}
