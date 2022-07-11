import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { of } from 'rxjs';
import { MessageBannerService } from '../message-banner/message-banner.service';
import { UserSettingsApiService } from './api/user-settings-api.service';
import { UserSettingsService } from './user-settings.service';

import { USER_SETTINGS_DTO } from '../../../mocks/user-settings.mock';

describe('user-settings', () => {
	describe('user-settings.service', () => {
		beforeEach(() => {
			const userSettingsApiServiceSpy = jasmine.createSpyObj(
				'UserSettingsApiService',
				['getUserSettings']
			);

			const messageBannerServiceSpy = jasmine.createSpyObj(
				'MessageBannerService',
				['addMessage']
			);

			TestBed.configureTestingModule({
				imports: [CommonModule],
				providers: [
					UserSettingsService,
					{
						provide: UserSettingsApiService,
						useValue: userSettingsApiServiceSpy,
					},
					{
						provide: MessageBannerService,
						useValue: messageBannerServiceSpy,
					},
				],
			});
		});

		describe('constructor', () => {
			it('should create an instance of the service', () => {
				// Arrange / Act
				const serviceUnderTest = TestBed.inject(UserSettingsService);

				// Assert
				expect(
					serviceUnderTest instanceof UserSettingsService
				).toBeTruthy();
			});
		});

		describe('loadSettings', () => {
			describe('when userSettings has not been loaded yet', () => {
				it('should fetch them', () => {
					// Arrange
					const serviceUnderTest =
						TestBed.inject(UserSettingsService);
					const userSettingsApiServiceSpy = TestBed.inject(
						UserSettingsApiService
					) as jasmine.SpyObj<UserSettingsApiService>;

					userSettingsApiServiceSpy.getUserSettings.and.returnValue(
						of(USER_SETTINGS_DTO)
					);

					// Act
					subscribeSpyTo(serviceUnderTest.loadSettings());

					// Assert
					expect(
						userSettingsApiServiceSpy.getUserSettings
					).toHaveBeenCalled();
					expect(serviceUnderTest['userSettings']).toEqual(
						USER_SETTINGS_DTO
					);
				});
			});

			describe('when userSettings has already been loaded', () => {
				it('should not fetch them again', () => {
					// Arrange
					const serviceUnderTest =
						TestBed.inject(UserSettingsService);
					const userSettingsApiServiceSpy = TestBed.inject(
						UserSettingsApiService
					) as jasmine.SpyObj<UserSettingsApiService>;

					serviceUnderTest['userSettings'] = USER_SETTINGS_DTO;

					// Act
					subscribeSpyTo(serviceUnderTest.loadSettings());

					// Assert
					expect(
						userSettingsApiServiceSpy.getUserSettings
					).not.toHaveBeenCalled();
				});
			});
		});

		describe('checkForPendingTCApprovals', () => {
			describe('when userSettings has not been loaded yet', () => {
				it('should not do anything', () => {
					// Arrange
					const serviceUnderTest =
						TestBed.inject(UserSettingsService);
					const messageBannerServiceSpy = TestBed.inject(
						MessageBannerService
					) as jasmine.SpyObj<MessageBannerService>;

					// Act
					serviceUnderTest.checkForPendingTCApprovals();

					// Assert
					expect(
						messageBannerServiceSpy.addMessage
					).not.toHaveBeenCalled();
				});
			});

			describe('when userSettings has already been loaded', () => {
				describe('and all termsAndConditions have been already approved', () =>
					it('should not do anything', () => {
						// Arrange
						const serviceUnderTest =
							TestBed.inject(UserSettingsService);
						const messageBannerServiceSpy = TestBed.inject(
							MessageBannerService
						) as jasmine.SpyObj<MessageBannerService>;

						const approvedTermsAndConditions = Object.keys(
							USER_SETTINGS_DTO.termsAndConditions
						).reduce((acc, key) => {
							return { ...acc, [key]: true };
						}, {});

						serviceUnderTest['userSettings'] = {
							...USER_SETTINGS_DTO,
							termsAndConditions: approvedTermsAndConditions,
						};

						// Act
						serviceUnderTest.checkForPendingTCApprovals();

						// Assert
						expect(
							messageBannerServiceSpy.addMessage
						).not.toHaveBeenCalled();
					}));

				describe('and there is at least one termsAndConditions that has not been approved yet', () =>
					it('should emit a message banner', () => {
						// Arrange
						const serviceUnderTest =
							TestBed.inject(UserSettingsService);
						const messageBannerServiceSpy = TestBed.inject(
							MessageBannerService
						) as jasmine.SpyObj<MessageBannerService>;

						messageBannerServiceSpy.addMessage.and.returnValue(
							new Promise(() => {})
						);

						serviceUnderTest['userSettings'] = {
							...USER_SETTINGS_DTO,
							termsAndConditions: {
								trackData: undefined,
							},
						};

						// Act
						serviceUnderTest.checkForPendingTCApprovals();

						// Assert
						expect(
							messageBannerServiceSpy.addMessage
						).toHaveBeenCalled();
					}));
			});
		});
	});
});
