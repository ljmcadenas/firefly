import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { OverviewComponent } from './components/overview/overview.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { TopMusicComponent } from './components/top-music/top-music.component';
import { MessageBannerService } from './services/message-banner/message-banner.service';

describe('AppComponent', () => {
  let bannerService: MessageBannerService;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SideNavigationComponent,
        OverviewComponent,
        TopMusicComponent
      ],
    providers: [MessageBannerService],

    }).compileComponents();
  });

  beforeEach(() => {
    bannerService = TestBed.inject(MessageBannerService);
    spyOn(bannerService, "displayBanner");

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it("should call banner service after view init", () => {
    app.ngAfterViewInit();
    expect(bannerService.displayBanner).toHaveBeenCalled();
  })
});
