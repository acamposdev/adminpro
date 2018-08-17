import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { UserService } from '../services/services.index';

import * as swal from 'sweetalert';
import { User } from '../models/user.model';
import { Router } from '../../../node_modules/@angular/router';

// IMPORTANTE!! Si no hacemos init_plugins() la pagina se queda cargando de forma indefinida. Es por el template
// y las librerias que utiliza internamente.
// Se sobrescribe custom.js metiendo todo el codigo en una funcion llamada init_plugins()
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    public _userService: UserService,
    public router: Router
  ) { }

  checkEquals(field1: string, field2: string) {
    return ( group: FormGroup) => {

      const pass1 = group.controls[field1].value;
      const pass2 = group.controls[field2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        equals: true
      };
    };
  }

  ngOnInit() {
    init_plugins();

    /**
     * FormGroupy FormControl para trabajar con formularios reactivos. Para ello hay que
     * tener en cuenta en el template:
     * 1. <form ngNativeValidate [formGroup]="form" (ngSubmit)="registerUser()" ...
     * 2. <input formControlName="email" name="email"...
     *    <input formControlName="password" name="password"...
     */
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required ),
      email: new FormControl(null, [Validators.required, Validators.email] ),
      password: new FormControl(null, Validators.required ),
      confirm: new FormControl(null, Validators.required ),
      terms: new FormControl(false)
    }, {
      /**
       * Implementacion de metodos de validacion personalizados
       */
      validators: this.checkEquals('password', 'confirm')
    });

    // Mostramos el formulario inicializado
    // TODO: Eliminar en produccion
    this.form.setValue({
      name: 'alejandro',
      email: 'aaaaa@test.com',
      password: '123456',
      confirm: '123456',
      terms: true
    });
  }

  /**
   * Metodo para registrar usuarios
   */
  registerUser() {
    console.log('Formulario valido: ', this.form.valid);
    if (this.form.invalid) {
      return;
    }
    if (!this.form.value.terms) {
      swal('Importante', 'Debe aceptar las condiciones', 'warning');
      console.log('Debe aceptar las condiciones');
    }

    // Creacion del user a registrar
    const user = new User(
      this.form.value.name,
      this.form.value.password,
      this.form.value.email
    );

    console.log(user);

    // Llamada al servico
    this._userService.createUser(user)
      .subscribe((result) => {
        console.log(result);

        // Si no hay problemas navegamos al login
        this.router.navigate(['/login']);
      });
  }
}
