import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  public entity: string;
  public id: string;

  public hide: string = 'hide';

  public notification = new EventEmitter<any>();

  constructor() {
  }

  hideModal() {
    this.hide = 'hide';
    this.entity = '';
    this.id = '';
  }

  showModal(entity: string, id: string) {
    this.entity = entity;
    this.id = id;
    this.hide = '';
  }
}
