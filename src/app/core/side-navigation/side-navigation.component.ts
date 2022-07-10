import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';

import { MenuItem } from './models/menu-item.interface';

@Component({
	selector: 'firefly-side-navigation',
	templateUrl: 'side-navigation.component.html',
	styleUrls: ['side-navigation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavigationComponent {
	@Input()
	public menu: MenuItem[] = [];

	@Output()
	public menuClicked = new EventEmitter<MenuItem>();

	public onMenuClicked(menuItem: MenuItem): void {
		this.menuClicked.emit(menuItem);
	}

	public onSettingsClicked(): void {
		// TODO: emit settings event to be handled on the consumer side
	}

	public onLogoutClicked(): void {
		// TODO: emit logout event to be handled on the consumer side
	}
}
