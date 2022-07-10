import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MessageBannerService } from '../message-banner/message-banner.service';
import { MessageBanner } from '../message-banner/models/message-banner.interface';
import { UserSettingsDto } from './api/dtos/user-settings.dto';
import { UserSettingsApiService } from './api/user-settings-api.service';
import { TERMS_CONDITIONS_MESSAGES_MAP } from './terms-conditions-messages-map';

@Injectable({ providedIn: 'root' })
export class UserSettingsService {
	private userSettings: UserSettingsDto | undefined;

	constructor(
		private userSettingsApiService: UserSettingsApiService,
		private messageBannerService: MessageBannerService
	) {}

	public loadSettings(): Observable<boolean> {
		if (this.userSettings) {
			return of(true);
		}

		return this.userSettingsApiService.getUserSettings().pipe(
			tap((userSettings) => {
				this.userSettings = userSettings;
			}),
			map(() => true)
		);
	}

	public checkForPendingTCApprovals(): void {
		if (this.userSettings) {
			const pendingTCs: string[] = Object.entries(
				this.userSettings.termsAndConditions
			)
				.filter(([_tcKey, tcValue]) => tcValue === undefined)
				.map(([tcKey]) => tcKey);

			const bannerMessages: MessageBanner[] = pendingTCs.map(
				(pendingTC) => {
					return {
						...TERMS_CONDITIONS_MESSAGES_MAP[pendingTC],
					};
				}
			);

			if (bannerMessages.length) {
				const defaultMessageLabels: Partial<MessageBanner> = {
					okAction: {
						label: 'I agree',
					},
					cancelAction: {
						label: 'Disagree',
					},
				};

				bannerMessages
					.map((message) => {
						return {
							...message,
							...defaultMessageLabels,
						};
					})
					.forEach((message) => {
						this.messageBannerService
							.addMessage(message)
							.then(({ success: accepted }) => {
								if (accepted) {
									this.updateUserSetting();
								}
							});
					});
			}
		}
	}

	private updateUserSetting(): void {
		// TODO: Call API to persist user settings and update local copy
	}
}
