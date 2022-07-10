import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageBannerResponse } from './models/message-banner-response.interface';
import {
	MessageBanner,
	MessageBannerWithCallback,
} from './models/message-banner.interface';

@Injectable()
export class MessageBannerService {
	private queue: MessageBannerWithCallback[] = [];
	private dispatchNextMessage$ = new BehaviorSubject<void>(void 0);

	public getNextMessage(): Observable<MessageBannerWithCallback> {
		return this.dispatchNextMessage$.pipe(map(() => this.queue[0]));
	}

	public addMessage(message: MessageBanner): Promise<MessageBannerResponse> {
		const promise = new Promise<MessageBannerResponse>((resolve) => {
			const messageWithCallback: MessageBannerWithCallback = {
				...message,
				okAction: {
					...message.okAction,
					callback: () => {
						resolve({ success: true });
						this.removeMessageFromQueue();
					},
				},
				cancelAction: {
					...message.cancelAction,
					callback: () => {
						resolve({ success: false });
						this.removeMessageFromQueue();
					},
				},
			};
			const shouldDispatch = !this.queue.length;
			this.queue.push(messageWithCallback);

			if (shouldDispatch) {
				this.dispatchNextMessage$.next();
			}
		});
		return promise;
	}

	private removeMessageFromQueue(): void {
		this.queue.shift();
		this.dispatchNextMessage$.next();
	}
}
