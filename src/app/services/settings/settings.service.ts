import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default'
  };

  constructor(
    @Inject(DOCUMENT) private _document
  ) {
    this.loadSettings();
  }

  saveSettings() {
    // console.log('Guardando en localStorage');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  loadSettings() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.applyTheme(this.ajustes.theme);
      // console.log('Leyendo localStorage...' , this.ajustes);
    } else {
      // console.log('Usando valores por defecto');
    }
  }

  applyTheme(theme: string) {
    const url = `assets/css/colors/${theme}.css`;
    // Sobrescribimos el theme del index.html
    this._document.getElementById('theme').setAttribute('href' , url);

    this.ajustes.theme = theme;
    this.ajustes.themeUrl = url;

    this.saveSettings();
  }
}

interface Ajustes {
  themeUrl: string;
  theme: string;
}
