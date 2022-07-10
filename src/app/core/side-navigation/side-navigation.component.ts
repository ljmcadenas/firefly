import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';

import { MenuItem } from './models/menu-item.interface';

const ANIMATION_TIMINGS = '15ms';

type AnimationState = 'collapsed' | 'expanded';
@Component({
	selector: 'firefly-side-navigation',
	templateUrl: 'side-navigation.component.html',
	styleUrls: ['side-navigation.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('slideInOutAnimation', [
			state(
				'collapsed',
				style({
					display: 'none',
				})
			),
			state(
				'expanded',
				style({
					display: 'flex',
				})
			),
			transition('collapsed <=> expanded', [animate(ANIMATION_TIMINGS)]),
		]),
	],
})
export class SideNavigationComponent {
	@Input()
	public menu: MenuItem[] = [];

	@Output()
	public menuClicked = new EventEmitter<MenuItem>();

	public slideInOutAnimationCurrentState: AnimationState = 'collapsed';

	public onMenuClicked(menuItem: MenuItem): void {
		this.toggleMenu('collapsed');
		this.menuClicked.emit(menuItem);
	}

	public onSettingsClicked(): void {
		// TODO: emit settings event to be handled on the consumer side
	}

	public onLogoutClicked(): void {
		// TODO: emit logout event to be handled on the consumer side
	}

	public toggleMenu(state?: AnimationState): void {
		this.slideInOutAnimationCurrentState = state
			? state
			: this.slideInOutAnimationCurrentState === 'expanded'
			? 'collapsed'
			: 'expanded';
	}
}
