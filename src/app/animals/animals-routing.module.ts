import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AnimalsComponent } from './animals.component';

const routes: Route[] = [
    {
        path: '',
        component: AnimalsComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AnimalsRoutingModule { }
