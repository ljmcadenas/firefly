import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {
	constructor(private router: Router) {}

	public canActivate(
		_route: ActivatedRouteSnapshot,
		_state: RouterStateSnapshot
	): boolean | Promise<boolean> {
		// TODO: implement
		if (true) {
			return true;
		}

		return this.router.navigate(['login']);
	}
}
