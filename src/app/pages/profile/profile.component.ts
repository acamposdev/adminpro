import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/services.index';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  imageUpload: File;
  imageTemp: any;

  constructor(
    public _userService: UserService
  ) {
    this.user = this._userService.user;
  }

  ngOnInit() {
  }

  save(user: User) {
    this.user.name = user.name;

    if (!this.user.google) {
      this.user.email = user.email;
    }

    this._userService.updateUser(this.user).subscribe((response) => {
      // console.log(response);
    });
  }

  /**
   * Metodo que detecta que se ha seleccionado un fichero
   * @param file Fichero seleccionado (en realidad podria mos recibir todo el evento)
   */
  imageSelection(file: File) {
    if (!file) {
      this.imageUpload = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      swal('Solo imagenes', 'El archivo seleccioando debe ser una imagen', 'error');
      this.imageUpload = null;
      return;
    }

    // Seteo de la imagen temporal
    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imageTemp = reader.result;
    };

    this.imageUpload = file;
  }

  /**
   * Metodo para hacer efectivo el cambio de imagen del usuario
   */
  changeImage() {
    this._userService.changeImage(this.imageUpload, this.user._id);
  }
}
