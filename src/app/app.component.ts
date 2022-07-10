import { Component, OnInit } from '@angular/core';
import { UserSettingsService } from './core/user-settings/user-settings.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	constructor(private userSettingsService: UserSettingsService) {}

	public ngOnInit() {
		this.userSettingsService.checkForPendingTCApprovals();
	}
}
