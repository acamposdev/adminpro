import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/services.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    public _ajustes: SettingsService
  ) { }

  ngOnInit() {
    this.setCheck();
  }

  cambiarColor(theme: string, link: any) {
    this._ajustes.applyTheme(theme);

    // Aplicamos la logica de sleccion del check
    this.aplicarCheck(link);
  }

  aplicarCheck(link: any) {
    const selectores: any = document.getElementsByClassName('selector');

    for ( const ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  setCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    const theme = this._ajustes.ajustes.theme;

    for ( const ref of selectores) {
      if (ref.getAttribute('data-theme') === theme) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
