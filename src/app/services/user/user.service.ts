import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-files/upload-file.service';

@Injectable()
export class UserService {
  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public _router: Router,
    public _uploadFileService: UploadFileService
  ) {
    console.log('UserService listo');
    this.loadFromStorage();
  }

  loginGoogle( token: string) {
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token: token })
      .map((response: any) => {
        // Guardamos la info en el localStorage
        this.saveInStorage(response.id, response.token, response.user);
      });
  }

  /**
   * Metodo para logar usuarios
   */
  login(user: User, rememberme: boolean) {
    const url = URL_SERVICIOS + '/login';

    // Implementacion del rememberme en el localStorage
    if (rememberme) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(url, user)
    .map((response: any) => { // :any para evitar el fallo de ts

      // Guardamos la info en el localStorage
      this.saveInStorage(response.id, response.token, response.user);

      return true;
    });
  }

  /**
   * Metodo para hacer logout
   */
  logout() {
    this.user = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this._router.navigate(['./login']);
  }

  /**
   * Metodo para guardar datos en local storage
   * Se podria mejorar con una implemetación de un servicio de storage a parte
   * @param id Identificador del user
   * @param token Token de autenticacion
   * @param user Usuario logado
   */
  saveInStorage(id: string, token: string, user: User) {
    // Guardamos la info en el localStorage
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  /**
   * Metodo para cargar desde el localStorage
   */
  loadFromStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  /**
   * Metodo para registrar usuarios en la aplicacion
   * Se utiliza el swal para mostrar un popup en caso de registrar al usuario correctamente
   */
  createUser(user: User) {
    const url = URL_SERVICIOS + '/users';
    return this.http.post(url, user)
      .map( (response: any) => {
        swal('Usuario creado', user.email, 'success');
        return response.user;
      });
  }

  /**
   * Metodo para actualizar usuarios
   */
  updateUser(user: User) {
    const url = URL_SERVICIOS + '/users/' + this.user._id + '?token=' + this.token;
    return this.http.put(url, user)
      .map((response: any) => {

        this.saveInStorage(response.user._id, this.token, response.user);
        swal('Usuario actualizado', user.name, 'success');

        return true;
      });
  }

  /**
   * Metodo para camniar la imagen de un usuario
   */
  changeImage(file: File, id: string) {
    this._uploadFileService.uploadFile(file, 'users', id)
      .then((response: any) => {
        // Sobrescribimos la imagen actual para que se refleje el cambio inmediatamente
        this.user.img = response.user.img;

        // Mostramos el popup de exito
        swal('Imagen actualizada', this.user.name, 'success');

        // Actualizamos el storage
        this.saveInStorage(id, this.token, this.user);
      })
      .catch((err) => {
        swal('Error modificando la imagen', this.user.name, 'error');
        console.log('ERROR ' , err);
      });
  }

  idLogged() {
    return (this.token.length > 5) ? true : false;
  }
}
