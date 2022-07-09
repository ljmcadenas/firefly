import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { MusicComponent } from './music.component';

const routes: Route[] = [
    {
        path: '',
        component: MusicComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MusicRoutingModule { }
