import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './components/overview/overview.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { TopMusicComponent } from './components/top-music/top-music.component';
import { MessageBannerModule } from './core/message-banner/message-banner.module';

@NgModule({
  declarations: [
    AppComponent,
    SideNavigationComponent,
    OverviewComponent,
    TopMusicComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
		MessageBannerModule,
})
export class AppModule { }
