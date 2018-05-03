import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/container/index.component';
import { CommonModule } from '@angular/common';


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

