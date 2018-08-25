import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

// IMPORTANTE!!! Se necesita para que no de warnings el editor de TS
declare var swal: any;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {
  hospitals: Hospital[] = [];
  totalRegs: number;
  offset: number = 0;
  loading: boolean = true;

  constructor(
    private _hospitalService: HospitalService,
    private _modalUploadService: ModalUploadService
  ) {
  }

  ngOnInit() {
    this.loadHospitals();

      // Nos suscribimos a cualquier cambio en el sistema de notificaciones
      this._modalUploadService.notification.subscribe((result) => {
        this.loadHospitals();
      });
  }

  /**
   * Metodo para obtener todos los hospitales
   */
  loadHospitals() {
    // Loading...
    this.loading = true;

    // Nos suscribimos al observable del servicio
    this._hospitalService.loadHospitals(this.offset).subscribe((result: any) => {
      this.hospitals = result.hospitals;
      this.totalRegs = result.total;

      // Loading...
      this.loading = false;
    });
  }

  createHospital() {
    swal({
      text: 'Nombre del hospital',
      content: 'input',
      button: {
        text: 'GUARDAR',
        closeModal: false,
      },
    })
    .then((value) => {
      if (!value) {
        return;
      } else {
        this._hospitalService.saveHospital(value).subscribe((resutl) => {
          // Actualizamos el listado
          this.loadHospitals();
        });
      }
    });
  }

  /**
   * Metodo para actualizar hospitales desde el listado
   * @param hospital Objeto hospital
   */
  updateHospital(hospital: Hospital) {
    console.log('Actualizando... ' , hospital);
    this._hospitalService.updateHospital(hospital).subscribe((result) => {
        // console.log('Resultado de actualizar hospital ' , result);
    });
  }

  /**
   * Metodo para eliminar hospitales
   * @param id Identificador del hospital
   */
  deleteHospital(id: string) {
    // Dialogo de confirmacion
    swal({
      title: 'Estas seguro?',
      text: 'Una vez eliminado no podra deshacer la accion',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((confirm) => {
      if (confirm) {
        this._hospitalService.deleteHospital(id).subscribe((result) => {
          this.offset = 0;
          this.loadHospitals();
        });
      }
    });
  }

  // Buscador de hospitales
  searchHospital(key: string) {
    if (key.length <= 0) {
      this.loadHospitals();
      return;
    }

    this.loading = true;

    this._hospitalService.searchHospital(key).subscribe((result) => {
      this.hospitals = result;
      this.loading = false;
    });
  }

  showModal(id: string) {
    this._modalUploadService.showModal('hospitals', id);
  }

  nextPage() {
    if (this.offset < (this.totalRegs - 5)) {
      this.offset = this.offset + 5;
      this.loadHospitals();
    }
  }

  previousPage() {
    if (this.offset >= 5) {
      this.offset = this.offset - 5;
      this.loadHospitals();
    }
  }
}
