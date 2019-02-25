import { Routes, RouterModule } from '@angular/router';

// Guards
import { AdminGuard, VerifyTokenGuard } from '../services/services.index';

// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { SearcherComponent } from './searcher/searcher.component';

const pagesRoutes: Routes = [

            {
                path: 'dashboard',
                component: DashboardComponent,
                data: {
                    title: 'Dashboard'
                },
                canActivate: [
                    VerifyTokenGuard
                ]
            },
            {
                path: 'progress',
                component: ProgressComponent,
                data: {
                    title: 'Progress Bars'
                }
            },
            {
                path: 'graficas1',
                component: Graficas1Component,
                data: {
                    title: 'Graficas'
                }
            },
            {
                path: 'promesas',
                component: PromesasComponent,
                data: {
                    title: 'Promesas'
                }
            },
            {
                path: 'rxjs',
                component: RxjsComponent,
                data: {
                    title: 'RxJS'
                }
            },
            {
                path: 'account-settings',
                component: AccountSettingsComponent,
                data: {
                    title: 'Ajustes del tema'
                }
            },
            {
                path: 'profile',
                component: ProfileComponent,
                data: {
                    title: 'Perfil de Usuario'
                }
            },
            {
                path: 'search/:key',
                component: SearcherComponent,
                data: {
                    title: 'Busqueda general'
                }
            },

            // Administracion
            {
                path: 'users',
                component: UsersComponent,
                data: {
                    title: 'Adminstración de Usuario'
                },
                canActivate: [
                    AdminGuard
                ]
            },
            {
                path: 'hospitals',
                component: HospitalsComponent,
                data: {
                    title: 'Adminstración de Hospitales'
                }
            },
            {
                path: 'doctors',
                data: {
                    title: 'Adminstración de Médicos'
                },
                loadChildren: './doctors/doctors.module#DoctorsModule'
            },
            {
                path: '',
                redirectTo: '/login',
                pathMatch: 'full'
            },
            /*
            {
                path: '**',
                component: NopagefoundComponent
            }
            */
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
