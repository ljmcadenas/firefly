import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview.component';

const routes: Route[] = [
    {
        path: '',
        component: OverviewComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OverviewRoutingModule { }
