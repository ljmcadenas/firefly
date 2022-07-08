import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from 'src/app/app.component';
import { OverviewComponent } from 'src/app/components/overview/overview.component';
import { SideNavigationComponent } from 'src/app/components/side-navigation/side-navigation.component';
import { TopMusicComponent } from 'src/app/components/top-music/top-music.component';
import { MessageBannerService } from './message-banner.service';

describe('MessageBannerService', () => {
  let service: MessageBannerService;
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
    service = TestBed.inject(MessageBannerService);
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  describe('display banner function', () => {
    describe("should show the", () => {
      it('banner', () => {
        service.displayBanner("", "");
        expect(fixture.nativeElement.querySelector("#banner")).toBeTruthy();
      })

      it('title', () => {
        service.displayBanner("foo", "");
        expect(fixture.nativeElement.querySelector("#banner h2").innerText).toEqual("foo");
      })

      it('message', () => {
        service.displayBanner("", "foo");
        expect(fixture.nativeElement.querySelector("#banner p").innerText).toEqual("foo");
      })

      it('custom accept text', () => {
        service.displayBanner("", "", "foo");
        expect(fixture.nativeElement.querySelector("#banner #accpectButton").innerText).toEqual("foo");
      })

      it('custom reject text', () => {
        service.displayBanner("", "", "", "foo");
        expect(fixture.nativeElement.querySelector("#banner #rejectButton").innerText).toEqual("foo");
      })
    })
  });
});
