import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService, DoctorService } from '../../services/services.index';
import { Doctor } from '../../models/doctor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {
  hospitals: Hospital[] = [];
  doctor: Doctor = new Doctor('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    private _hospitalService: HospitalService,
    private _doctorService: DoctorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe((params) => {
      // console.log(params);
      const id = params.doctorId;

      if (id !== 'new') {
        this.loadDoctor(id);
      }
    });
  }

  ngOnInit() {
    this._hospitalService.loadHospitals(0).subscribe((result: any) => {
      // console.log(result);
      this.hospitals = result.hospitals;
    });

    // Nos suscribimos a posibles cambios en la imagen
    this._modalUploadService.notification.subscribe((result) => {
      // Actualizams la imagen para que se reflejen los cambios
      this.doctor.img = result.doctor.img;
    });
  }

  /**
   * Metodo para cargar un medico
   * @param id Identificador del medico
   */
  loadDoctor(id: string) {
    this._doctorService.getDoctorById(id).subscribe((doctor: any) => {
      this.doctor = doctor;
      this.doctor.hospital = doctor.hospital._id;

      // Actualizamos la imagen del hospital
      this.changeHospital(this.doctor.hospital);
    });
  }

  /**
   * Metodo para guardar los datos de un medico
   * @param form Formulario para medicos
   */
  save(form: NgForm) {

    if (!form.valid) {
      return;
    }
    this._doctorService.save(this.doctor).subscribe((result: any) => {
      this.doctor._id = result.doctor._id;
      this.router.navigate(['/doctors', result.doctor._id]);
    });
  }

  /**
   * Metodo para mostrar el modal de seleccion de imagen
   */
  showModal() {
    this._modalUploadService.showModal('doctors', this.doctor._id);
  }

  /**
   * Metodo para obtener el hospital
   * @param id Identificador del hospital
   */
  changeHospital(id: string) {
    if (!id) {
      return;
    }

    this._hospitalService.getHospital(id).subscribe((result) => {
      this.hospital = result;
    });
  }
}
