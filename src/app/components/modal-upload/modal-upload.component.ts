import { Component, OnInit } from '@angular/core';
import { UploadFileService, UserService } from '../../services/services.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imageUpload: File;
  imageTemp: any;

  constructor(
    private _uploadFileService: UploadFileService,
    private _modalUploadService: ModalUploadService,
    private _userService: UserService
  ) { }

  ngOnInit() {
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

  closeModal() {
    this.imageTemp = null;
    this.imageUpload = null;

    this._modalUploadService.hideModal();
  }

  changeImage() {
    this._uploadFileService.uploadFile(this.imageUpload, this._modalUploadService.entity, this._modalUploadService.id)
      .then((result: any) => {

        // console.log('result --> ' , result);

        this.closeModal();

        // Si el usuario actualizado es el usuario logado debe actualizarse en el localStorage y en userService
        if (result.user && this._userService.user._id === result.user._id) {
          // Actualizamos la imagen
          this._userService.user.img = result.user.img;
          // Actualizamos el storage
          this._userService.saveInStorage(result.user._id, this._userService.token, result.user, result.menu);
        }

        this._modalUploadService.notification.emit(result);
        swal('Actualizar Imagen', 'Imagen actualizada correctramente', 'success');
      })
      .catch((err) => {
        console.log('Error en la carga ' , err);
      });
  }
}
