import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; // Prevee un mensaje de error en la consola del navegador

import { Router } from '@angular/router';
import { UploadFileService } from '../upload-files/upload-file.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  user: User;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public _router: Router,
    public _uploadFileService: UploadFileService
  ) {
    this.loadFromStorage();
  }

  /**
   * Metodo de renovacion de token JWT
   */
  tokenRenoval() {
    const url = URL_SERVICIOS + '/login/tokenrenoval?token=' + this.token;
    return this.http.get(url)
      .map((result: any) => {
        this.token = result.token;
        localStorage.setItem('token', this.token);

        return result;
      })
      .catch((err) => {
        this._router.navigate(['/login']);
        swal('Error de auetnticacion', 'No se pudo renovar el token', 'error');
        return Observable.throw(err);
      });
  }

  loginGoogle( token: string) {
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token: token })
      .map((response: any) => {
        // console.log('LOGIN GOOGLE: ' , response);

        // Guardamos la info en el localStorage
        this.saveInStorage(response.id, response.token, response.user, response.menu);
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
        // console.log('LOGIN: ' , response);

        // Guardamos la info en el localStorage
        this.saveInStorage(response.id, response.token, response.user, response.menu);

        return true;
      })
      .catch(err => {
        // console.log(err.error.message);
        swal('Error en el login', err.error.message, 'error');
        return Observable.throw(err);
      });
  }

  /**
   * Metodo para hacer logout
   */
  logout() {
    this.user = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');

    this._router.navigate(['./login']);
  }

  /**
   * Metodo para guardar datos en local storage
   * Se podria mejorar con una implemetación de un servicio de storage a parte
   * @param id Identificador del user
   * @param token Token de autenticacion
   * @param user Usuario logado
   */
  saveInStorage(id: string, token: string, user: User, menu: any) {
    // Guardamos la info en el localStorage
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.user = user;
    this.token = token;
    this.menu = menu;
  }

  /**
   * Metodo para cargar desde el localStorage
   */
  loadFromStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
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
      })
      .catch(err => {
        // console.log(err.error.message);
        swal(err.error.message, err.error.errors.message, 'error');
        return Observable.throw(err);
      });
  }

  /**
   * Metodo para actualizar usuarios
   */
  updateUser(user: User) {
    const url = URL_SERVICIOS + '/users/' + user._id + '?token=' + this.token;
    return this.http.put(url, user)
      .map((response: any) => {

        if (response.user._id === this.user._id) {
          this.saveInStorage(response.user._id, this.token, response.user, response.menu);
        }
        swal('Usuario actualizado', user.name, 'success');

        return true;
      })
      .catch(err => {
        // console.log(err.error.message);
        swal(err.error.message, err.error.errors.message, 'error');
        return Observable.throw(err);
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
        this.saveInStorage(id, this.token, this.user, this.menu);
      })
      .catch((err) => {
        swal('Error modificando la imagen', this.user.name, 'error');
        console.log('ERROR ' , err);
      });
  }

  /**
   * Metodo para recuperar los usuario del servidor paginados
   */
  getUsers(offset: number = 0) {
    const url = URL_SERVICIOS + '/users?offset=' + offset;
    return this.http.get(url);
  }

  searchUsers(key: string) {
    const url = URL_SERVICIOS + '/search/collection/user/' + key;
    return this.http.get(url)
      .map((response: any) => response.user);
  }

  removeUser(id: string) {
    const url = URL_SERVICIOS + '/users/' + id + '?token=' + this.token;
    return this.http.delete(url)
      .map(result => {
        swal('Usuario borrado', 'Usuario borrado correctamente', 'success');
        return true;
      });
  }

  idLogged() {
    return (this.token.length > 5) ? true : false;
  }
}
