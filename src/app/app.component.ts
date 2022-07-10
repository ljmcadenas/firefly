import { Component, OnInit } from '@angular/core';
import { MenuItem } from './core/side-navigation/models/menu-item.interface';
import { UserSettingsService } from './core/user-settings/user-settings.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	public menuItems: MenuItem[] = [];

	constructor(private userSettingsService: UserSettingsService) {}

	public ngOnInit() {
		this.userSettingsService.checkForPendingTCApprovals();
		// TODO: consume from a service
		this.menuItems = [
			{
				label: 'Overview',
				route: ['overview'],
			},
			{
				label: 'Animals',
				route: ['animals'],
			},
			{
				label: 'Food',
				route: ['food'],
			},
			{
				label: 'Music',
				route: ['music'],
			},
		];
	}

	public onMenuClicked(_menuItemClicked: MenuItem): void {
		// TODO: do something
	}
}
