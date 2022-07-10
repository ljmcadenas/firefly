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
	HostBinding,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageBannerService } from './message-banner.service';
import { MessageBannerWithCallback } from './models/message-banner.interface';

const ANIMATION_TIMINGS = '300ms cubic-bezier(0.000, 0.000, 0.210, 1.000)';

@Component({
	selector: 'firefly-message-banner',
	templateUrl: 'message-banner.component.html',
	styleUrls: ['message-banner.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('accordionAnimation', [
			state(`collapsed`, style({ height: '0px', visibility: 'hidden' })),
			state(
				`expanded, void`,
				style({ height: '*', visibility: 'visible' })
			),
			transition(
				`expanded <=> collapsed, * <=> *, void => expanded`,
				animate(ANIMATION_TIMINGS)
			),
		]),
	],
})
export class MessageBannerComponent implements OnInit, OnDestroy {
	public message: MessageBannerWithCallback | undefined;

	@HostBinding('@accordionAnimation')
	public get accordionAnimationCurrentState(): 'collapsed' | 'expanded' {
		return this.message ? 'expanded' : 'collapsed';
	}

	private destroyed$ = new Subject<void>();

	constructor(private messageBannerService: MessageBannerService) {}

	public ngOnInit() {
		this.messageBannerService
			.getNextMessage()
			.pipe(takeUntil(this.destroyed$))
			.subscribe((currentMessage) => {
				this.message = currentMessage;
			});
	}

	public ngOnDestroy(): void {
		this.destroyed$.next();
	}
}
