import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { TopMusicComponent } from './top-music.component';

describe('TopMusicComponent', () => {
  let component: TopMusicComponent;
  let fixture: ComponentFixture<TopMusicComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopMusicComponent],
      providers: [DataService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMusicComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService)
    fixture.detectChanges();
  });

  describe("on init", () => {
    beforeEach(() => {
      spyOn(dataService, "getSongs").and.returnValue(of([{ artist: "", plays: 0, songs: 0 }]));
      component.ngOnInit();
    });

    it('should subscribe to the data service', () => {
      expect(dataService.getSongs).toHaveBeenCalled();
    });

    it('should set songs', () => {
      expect(component.songs).toEqual([{ artist: "", plays: 0, songs: 0 }])
    });
  })
});
