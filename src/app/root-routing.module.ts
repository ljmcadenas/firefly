import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './core/security/authentication.guard';

const routes: Route[] = [
	{
		path: '',
		redirectTo: 'main',
		pathMatch: 'full',
	},
	{
		path: 'login',
		loadChildren: () =>
			import('./login/login.module').then((m) => m.LoginModule),
	},
	{
		path: 'main',
		canActivate: [AuthenticationGuard],
		loadChildren: () => import('./app.module').then((m) => m.AppModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class RootRoutingModule {}
