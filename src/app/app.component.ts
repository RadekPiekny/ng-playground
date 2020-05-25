import { Component } from '@angular/core';
import { ModalService } from './service/modal.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  darkMode: boolean;

  constructor(public modalService: ModalService) {}

  changeMode(darkMode: boolean) {
    this.darkMode = darkMode;
  }

  getTheme(): string {
    if (this.darkMode) {
      return 'dark';
    }
    return 'light';
  }
}
