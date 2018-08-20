import { NgModule } from '@angular/core';

import { RouterModule } from '../../../node_modules/@angular/router';
import { CommonModule } from '../../../node_modules/@angular/common';

import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PipesModule
    ],
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        NopagefoundComponent
    ],

    // Exportamos porque se van a usar en otros modulos.
    // En nuestro caso se utilizara en PagesModule
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumsComponent,
        NopagefoundComponent
    ]
})
export class SharedModule { }
