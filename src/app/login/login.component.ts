import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/services.index';
import { User } from '../models/user.model';

// IMPORTANTE!! Si no hacemos init_plugins() la pagina se queda cargando de forma indefinida. Es por el template
// y las librerias que utiliza internamente.
// Se sobrescribe custom.js metiendo todo el codigo en una funcion llamada init_plugins()
declare function init_plugins();

// Utilizamos la libreria de google cargada en el index
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  // Si no se crea esta variable y no se habilita en el formulario el valor vendra vacio. De esta manera ya vendra a false
  rememberme: boolean = false;
  email: string;

  auth2: any;

  constructor(
    public _router: Router,
    public _userService: UserService
  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    // Si esta el rememberme debe estar en el localStorage
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) {
      this.rememberme = true;
    }
  }

  /**
   * Implementacion propia del boton de login con google plus
   */
  googleInit() {
    // inicializamos la autenticacion con auth2 pasandole las opciones
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '55814643817-8q20ovi4nfm6v3ss746tst8f8cklcjlc.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      // Adjuntamos el listener del boton propio (no usamos el de google por defecto)
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  /**
   * Metodo para adjuntar el hadel del click sobre el boton de google plus
   * El callback nos devuelve el googleUser en caso de logarnos correctamente
   */
  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      const profile = googleUser.getBasicProfile();
      console.log(profile);

      const token = googleUser.getAuthResponse().id_token;
      console.log(token);

      // Nos logamos en google atraves del servicio
      this._userService.loginGoogle(token).subscribe((result) => {
        // this._router.navigate(['/dashboard']);
        // FIX
        window.location.href = '#/dashboard';
      });
    });
  }

  /**
   * Metodo para logar al usuario
   * Utilizamos NgForm para trabajar con formularios con la aproximacion por template. La otra posibilidad
   * es formularios reactivos (ver register)
   */
  login(form: NgForm) {
    console.log(form.valid);
    console.log(form.value);

    if (!form.valid) {
      return;
    }

    const user = new User(null, form.value.password, form.value.email);

    // Login por email y password
    this._userService.login(user, form.value.rememberme).subscribe(() => {
      this._router.navigate( [ '/dashboard' ] );
    });
  }
}
