import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Route[] = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: 'overview',
                loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule)
            },
            {
                path: 'animals',
                loadChildren: () => import('./animals/animals.module').then(m => m.AnimalsModule)
            },
            {
                path: 'food',
                loadChildren: () => import('./food/food.module').then(m => m.FoodModule)
            },
            {
                path: 'music',
                loadChildren: () => import('./music/music.module').then(m => m.MusicModule)
            },
            {
                path: '',
                redirectTo: 'overview',
                pathMatch: 'full'
            },
            {
                path: '**',
                loadChildren: () => import('./core/not-found/not-found.module').then(m => m.NotFoundModule)
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
