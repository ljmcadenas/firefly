import { AfterViewInit, Component } from '@angular/core';
import { MessageBannerService } from './services/message-banner/message-banner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(private bannerService: MessageBannerService) { }

  public ngAfterViewInit() {
    this.bannerService.displayBanner(
      "Welcome!",
      "Before you get to carried away, do you agree to us collecting anonimized statistics about your usage of our app?"
      );
  }
}
