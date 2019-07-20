import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  darkMode: boolean;
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
