import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LandingComponent } from './components/container/index.component';



const routes: Routes = [
    { path: "", component: LandingComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes),CommonModule],
    exports: [],
    declarations: [LandingComponent],
    providers: [],
})
export class LandingModule { }

