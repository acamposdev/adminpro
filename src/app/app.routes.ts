import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';
import { LoginGuardGuard } from './services/services.index';

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        component: PagesComponent,
        canActivate: [
            LoginGuardGuard
        ],
        loadChildren: './pages/pages.module#PagesModule'
    },
    {
        path: '**',
        component: NopagefoundComponent
    }
];

// TODO: Por que se pone useHash a true???
export const APP_ROUTES = RouterModule.forRoot( appRoutes , { useHash: true });
