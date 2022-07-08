import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ChangeType } from 'src/app/enums/change-type.enum';
import { DataService } from 'src/app/services/data/data.service';
import { OverviewComponent } from './overview.component';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewComponent],
      providers: [DataService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService)
    fixture.detectChanges();
  });

  describe("on init", () => {
    beforeEach(() => {
      spyOn(dataService, "getOverviewData").and.returnValue(of([{ text: "", changeType: ChangeType.Increase, value: 1, periodDelta: 1 }]));
      component.ngOnInit();
    });

    it('should subscribe to the data service', () => {
      expect(dataService.getOverviewData).toHaveBeenCalled();
    });

    it('should set overview data', () => {
      expect(component.overviewData).toEqual([{ text: "", changeType: ChangeType.Increase, value: 1, periodDelta: 1 }])
    });
  })
});
