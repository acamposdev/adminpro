import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';

import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
  LoginGuardGuard, SettingsService, SidebarService,
  SharedService, UserService, HospitalService, DoctorService,
  UploadFileService } from './services.index';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    LoginGuardGuard,
    AdminGuard,
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    HospitalService,
    DoctorService,
    UploadFileService,
    ModalUploadService
  ]
})
export class ServiceModule { }
