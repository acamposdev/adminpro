import { NgModule } from '../../../node_modules/@angular/core';

// Rutas
import { PAGES_ROUTES } from './page.routes';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        PAGES_ROUTES,
        SharedModule
    ]
})
export class PagesModule { }
