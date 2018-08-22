import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';

import { SettingsService, SidebarService, SharedService, UserService } from './services.index';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { UploadFileService } from './upload-files/upload-file.service';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    LoginGuardGuard,
    SettingsService,
    SidebarService,
    SharedService,
    UserService,
    UploadFileService,
    ModalUploadService
  ]
})
export class ServiceModule { }
