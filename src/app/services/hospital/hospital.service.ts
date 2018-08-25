import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import { UserService } from '../user/user.service';

@Injectable()
export class HospitalService {

  constructor(
    private http: HttpClient,
    private _userService: UserService
  ) { }

  /**
   * Metodo que devuleve el observable con la peticion para obtener todos los hospitales
   */
  loadHospitals(offset: number) {
    const url = URL_SERVICIOS + '/hospital?offset=' + offset;
    return this.http.get(url);
  }

  /**
   * Metodo para obtener un hospital por ID
   * @param id Identificador del hospital
   */
  getHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
      .map((result: any) => {
        return result.hospital;
      });
  }

  /**
   * Metodo para crear hospitales
   * @param name Nombre del hospital
   */
  saveHospital(name: string) {
    const url = URL_SERVICIOS + '/hospital?token=' + this._userService.token;
    const hospital = new Hospital(name);
    return this.http.post(url, hospital)
      .map((result: any) => {
        swal('Crear Hospital', 'Hospital dado de alta correctamente', 'success');
        return result.name;
      });
  }

  /**
   * Metodo para actualizar hospitales
   */
  updateHospital(hospital: Hospital) {
    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._userService.token;
    return this.http.put(url, hospital)
      .map((result) => {
        swal('Actualizar Hospital', 'Hospital actualizado correctamente', 'success');
        return true;
      });
  }

  /**
   * Metodo para borrar hospitales
   * @param id Identificador del hospital
   */
  deleteHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._userService.token;
    return this.http.delete(url)
      .map((result) => {
        swal('Borrar Hospital', 'Hospital borrado correctamente', 'success');
      });
  }

  /**
   * Metodo para buscar hospitales por un criterio dado
   * @param key criterio de busqueda
   */
  searchHospital(key: string) {
    // localhost:3000/search/collection/user/a
    const url = URL_SERVICIOS + '/search/collection/hospital/' + key;
    return this.http.get(url)
      // Hacemos el map porque solo nos interesa el listado de hospitales
      .map((result: any) => {
        // console.log('resultado de busqueda ' , result);
        return result.hospital;
      });
  }
}
