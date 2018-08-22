import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'ProgressBar', url: '/progress' },
        { titulo: 'Graficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'RxJS', url: '/rxjs' },
      ]
    },
    {
      titulo: 'Administracion',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/users' },
        { titulo: 'Hospitales', url: '/hospitals' },
        { titulo: 'Medicos', url: '/doctors' }
      ]
    }
  ];

  constructor() { }

}
