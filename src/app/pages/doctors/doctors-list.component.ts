import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/services.index';
import { Doctor } from '../../models/doctor.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal;

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styles: []
})
export class DoctorsListComponent implements OnInit {
  doctors: Doctor[] = [];
  totalRegs: number;
  offset: number = 0;
  loading: boolean = true;

  constructor(
    private _doctorService: DoctorService,
    private _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.loadAll();

    this._modalUploadService.notification.subscribe((result) => {
      this.loadAll();
    });
  }

  /**
   * Metodo para obtener todos los usuarios
   */
  loadAll() {
    this.loading = true;

    // Cargamos los medicos
    this._doctorService.loadAll(this.offset).subscribe((result: any) => {
      this.doctors = result.doctors;
      this.totalRegs = result.total;
      this.loading = false;
    });
  }

  // Buscador de hospitales
  searchDoctor(key: string) {
    if (key.length <= 0) {
      this.loadAll();
      return;
    }

    this.loading = true;

    this._doctorService.search(key).subscribe((result) => {
      this.doctors = result;
      this.loading = false;
    });
  }

  /**
   * Metodo para borrar un medico
   * @param id Identificador del medico a borrar
   */
  delete(id: string) {

    // Dialogo de confirmacion
    swal({
      title: 'Estas seguro?',
      text: 'Una vez eliminado no podra deshacer la accion',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((confirm) => {
      if (confirm) {
        this._doctorService.delete(id).subscribe((result) => {
          this.offset = 0;
          this.loadAll();
        });
      }
    });
  }

  showModal(id: string) {
    this._modalUploadService.showModal('doctors', id);
  }

  nextPage() {
    if (this.offset < (this.totalRegs - 5)) {
      this.offset = this.offset + 5;
      this.loadAll();
    }
  }

  previousPage() {
    if (this.offset >= 5) {
      this.offset = this.offset - 5;
      this.loadAll();
    }
  }
}
