import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UserService } from '../user/user.service';
import { Doctor } from '../../models/doctor.model';

@Injectable()
export class DoctorService {

  constructor(
    private http: HttpClient,
    private _userService: UserService
  ) { }

  /**
   * Metodo para obtener todos los medicos
   */
  loadAll(offset: number) {
    const url = URL_SERVICIOS + '/doctor?offset=' + offset;
    return this.http.get(url);
  }

  /**
   * Metodo para crear medicos
   */
  save(doctor: Doctor) {
    let url = URL_SERVICIOS + '/doctor';

    // Diferenciamos el alta de la actualizacion
    if (doctor._id) {
      // Actualizamo el usuarios
      url += '/' + doctor._id;
      url += '?token=' + this._userService.token;

      return this.http.put(url, doctor)
        .map((result) => {
          swal('Actualizar Médico', 'Medico actualizdo correctamente', 'success');
          return result;
        });

    } else {
      // Crea nuevo
      url += '?token=' + this._userService.token;

      return this.http.post(url, doctor)
        .map((result) => {
          swal('Crear Médico', 'Medico creado correctamente', 'success');
          return result;
        });
    }
  }

  /**
   * Metodo para buscar medicos
   */
  search(key: string) {
    // localhost:3000/search/collection/doctor/key
    const url = URL_SERVICIOS + '/search/collection/doctor/' + key;
    return this.http.get(url)
      // Hacemos el map porque solo nos interesa el listado de medicos
      .map((result: any) => {
        // console.log('resultado de busqueda ' , result);
        return result.doctor;
      });
  }

  /**
   * Metodo para borrar un medico
   */
  delete(id: string) {
    const url = URL_SERVICIOS + '/doctor/' + id + '?token=' + this._userService.token;
    return this.http.delete(url)
      .map((result) => {
        swal('Borrar médico', 'Medico eliminado correctamente', 'success');
        return result;
      });
  }

  /**
   * Metodo para obtener medicos por id
   * @param id Identificador del medico
   */
  getDoctorById(id: string) {
    const url = URL_SERVICIOS + '/doctor/' + id;
    return this.http.get(url)
      .map((result: any) => {
        return result.doctor;
      });
  }
}
