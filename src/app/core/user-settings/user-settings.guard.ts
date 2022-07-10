import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivateChild,
	RouterStateSnapshot,
} from '@angular/router';
import { UserSettingsService } from './user-settings.service';

@Injectable({ providedIn: 'root' })
export class UserSettingsGuard implements CanActivateChild {
	constructor(private userSettings: UserSettingsService) {}

	public canActivateChild(
		_route: ActivatedRouteSnapshot,
		_state: RouterStateSnapshot
	): Observable<boolean> {
		return this.userSettings.loadSettings();
	}
}
