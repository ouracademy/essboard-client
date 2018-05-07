import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { CommonAppModule } from '@shared/common';
import { LandingComponent } from './components/container/index.component';

const routes: Routes = [
    { path: "", component: LandingComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        CommonAppModule,
        MatButtonModule
    ],
    exports: [],
    declarations: [LandingComponent],
    providers: []
})
export class LandingModule { }

