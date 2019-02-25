import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DOCTOR_ROUTES } from './doctors-routes';
import { DoctorsListComponent } from './doctors-list.component';
import { DoctorsComponent } from './doctors.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PipesModule,
    DOCTOR_ROUTES
  ],
  declarations: [
    DoctorsComponent,
    DoctorsListComponent
  ]
})
export class DoctorsModule { }
