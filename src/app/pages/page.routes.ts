import { Routes, RouterModule } from '@angular/router';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/services.index';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [
            LoginGuardGuard
        ],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: {
                    title: 'Dashboard'
                }
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
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
