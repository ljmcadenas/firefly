import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { MessageBannerComponent } from './message-banner.component';
import { MessageBannerService } from './message-banner.service';

@NgModule({
	imports: [CommonModule],
	exports: [MessageBannerComponent],
	declarations: [MessageBannerComponent],
})
export class MessageBannerModule {
	public static forRoot(): ModuleWithProviders<MessageBannerModule> {
		return {
			ngModule: MessageBannerModule,
			providers: [MessageBannerService],
		};
	}
}
