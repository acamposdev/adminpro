import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  /**
   * Implementacion de un pipe que pone la ruta completa a un nombre de imagen
   */
  transform(img: string, entity: string = 'users'): any {

    let url = URL_SERVICIOS + '/images';

    if (!img) {
      return url + '/users/xxx';
    }

    // Imagen de google
    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (entity) {
      case 'users':
        url += '/users/' + img;
      break;

      case 'doctors':
        url += '/doctor/' + img;
      break;

      case 'hospitals':
        url += '/hospitals/' + img;
      break;

      default:
        console.log('El tipo de imagen no existe');
        url += '/users/xxx';
    }

    return url;
  }

}
