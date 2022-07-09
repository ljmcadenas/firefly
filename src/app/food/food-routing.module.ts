import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { FoodComponent } from './food.component';

const routes: Route[] = [
    {
        path: '',
        component: FoodComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FoodRoutingModule { }
