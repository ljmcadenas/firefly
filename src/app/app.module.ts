import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { OverviewComponent } from './components/overview/overview.component';
import { TopMusicComponent } from './components/top-music/top-music.component';
import { MessageBannerService } from './services/message-banner/message-banner.service';

@NgModule({
  declarations: [
    AppComponent,
    SideNavigationComponent,
    OverviewComponent,
    TopMusicComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [MessageBannerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
