import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');
  constructor() {
    const urlTheme =
      localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme.setAttribute('href', urlTheme);
  }

  changeTheme(theme: string) {
    const urlTheme = `./assets/css/colors/${theme}.css`;

    this.linkTheme.setAttribute('href', urlTheme);
    localStorage.setItem('theme', urlTheme);

    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');
    links.forEach((e) => {
      e.classList.remove('working');
      const btnTheme = e.getAttribute('data-theme');
      const btnUrlTheme = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');
      if (currentTheme === btnUrlTheme) {
        e.classList.add('working');
      }
    });
  }
}
