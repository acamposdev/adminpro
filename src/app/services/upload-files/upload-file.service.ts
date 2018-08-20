import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class UploadFileService {

  constructor() { }

  /**
   * Subida de ficheros con un servicio
   * Utiliza javascript puro con una peticion ajax ya que aun no hay un upload implementado por angular
   */
  uploadFile(file: File, type: string, id: string) {

    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('image', file, file.name);

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Imagen subida correctamente');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Fallo al subir fichero');
            reject(xhr.response);
          }
        }
      };

      const url = URL_SERVICIOS + '/upload/' + type + '/' + id;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
