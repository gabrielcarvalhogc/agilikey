import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-help-modal',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  templateUrl: './help-modal.component.html',
  styleUrl: './help-modal.component.scss'
})
export class HelpModalComponent {
displayModal: boolean = false;

  showDialog() {
    this.displayModal = true;
  }

  hideDialog() {
    this.displayModal = false;
  }
}
