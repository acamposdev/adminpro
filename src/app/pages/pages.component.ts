import { Component, OnInit } from '@angular/core';

// IMPORTANTE!! Si no hacemos init_plugins() la pagina se queda cargando de forma indefinida. Es por el template
// y las librerias que utiliza internamente.
// Se sobrescribe custom.js metiendo todo el codigo en una funcion llamada init_plugins()
declare function init_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
