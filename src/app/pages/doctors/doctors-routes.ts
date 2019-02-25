import { Routes, RouterModule } from '@angular/router';
import { DoctorsListComponent } from './doctors-list.component';
import { DoctorsComponent } from './doctors.component';

const doctorRoutes: Routes = [
    {
        path: '',
        component: DoctorsListComponent,
        data: {
            title: 'Adminstración de Médicos'
        }
    },
    {
        path: ':doctorId',
        component: DoctorsComponent,
        data: {
            title: 'Edicion de Médicos'
        }
    }
];

export const DOCTOR_ROUTES = RouterModule.forChild( doctorRoutes );
