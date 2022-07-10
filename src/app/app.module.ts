import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './components/overview/overview.component';
import { TopMusicComponent } from './components/top-music/top-music.component';
import { MessageBannerModule } from './core/message-banner/message-banner.module';
import { SideNavigationModule } from './core/side-navigation/side-navigation.module';

@NgModule({
	declarations: [AppComponent, OverviewComponent, TopMusicComponent],
	imports: [
		CommonModule,
		AppRoutingModule,
		SideNavigationModule,
		MessageBannerModule,
	],
})
export class AppModule {}
