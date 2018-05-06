import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CommonAppModule } from '@shared/common';
import { HeaderModule } from '@shared/header/index.module';
import { LandingComponent } from './components/container/index.component';

import { MatButtonModule } from '@angular/material';




const routes: Routes = [
    { path: "", component: LandingComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes),
        CommonModule,
        CommonAppModule,HeaderModule,
        MatButtonModule],
    exports: [],
    declarations: [LandingComponent],
    providers: [],
    schemas:[ NO_ERRORS_SCHEMA ]
})
export class LandingModule { }

