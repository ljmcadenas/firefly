import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageBannerModule } from './core/message-banner/message-banner.module';
import { SideNavigationModule } from './core/side-navigation/side-navigation.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		CommonModule,
		AppRoutingModule,
		SideNavigationModule,
		MessageBannerModule,
	],
})
export class AppModule {}
