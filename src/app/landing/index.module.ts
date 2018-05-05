import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommonAppModule } from '@shared/common'
import { LandingComponent } from './components/container/index.component';

import {MatButtonModule} from '@angular/material';




const routes: Routes = [
    { path: "", component: LandingComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes),
        CommonModule,
        CommonAppModule,MatButtonModule],
    exports: [],
    declarations: [LandingComponent],
    providers: [],
})
export class LandingModule { }

