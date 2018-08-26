import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class SearcherService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Servicio para buscr en todas las entidades
   */
  search(key: string) {
    const url = URL_SERVICIOS + '/search/all/' + key;
    return this.http.get(url);
  }
}
