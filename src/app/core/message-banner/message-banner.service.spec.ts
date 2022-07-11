import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { MessageBannerService } from './message-banner.service';
import { MessageBanner } from './models/message-banner.interface';

describe('message-banner', () => {
	describe('message-banner.service', () => {
		beforeEach(() => {
			TestBed.configureTestingModule({
				imports: [CommonModule],
				providers: [MessageBannerService],
			});
		});

		describe('constructor', () => {
			it('should create an instance of the service', () => {
				// Arrange / Act
				const serviceUnderTest = TestBed.inject(MessageBannerService);

				// Assert
				expect(
					serviceUnderTest instanceof MessageBannerService
				).toBeTruthy();
			});
		});

		describe('addMessage', () => {
			it('should increase the queue by 1', () => {
				// Arrange
				const serviceUnderTest = TestBed.inject(MessageBannerService);
				const mockMessage: MessageBanner = {
					title: 'test',
					body: 'does it work?',
				};

				// Act
				const promise = serviceUnderTest.addMessage(mockMessage);

				// Assert
				expect(serviceUnderTest['queue'].length).toBe(1);
			});
		});

		describe('when the queue is empty', () => {
			it('should it should dispatch the next message', () => {
				// Arrange
				const serviceUnderTest = TestBed.inject(MessageBannerService);
				const mockMessage: MessageBanner = {
					title: 'test',
					body: 'does it work?',
				};

				// Act
				const dispatchNextMessageSpy = subscribeSpyTo(
					serviceUnderTest['dispatchNextMessage$']
				);

				// Assert
				expect(dispatchNextMessageSpy.receivedNext()).toBeTrue();
			});
		});
	});
});
