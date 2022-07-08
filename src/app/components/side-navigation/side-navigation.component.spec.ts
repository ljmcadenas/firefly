import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { SideNavigationComponent } from './side-navigation.component';

describe('SideNavigationComponent', () => {
  let component: SideNavigationComponent;
  let fixture: ComponentFixture<SideNavigationComponent>;
  let navigationService: NavigationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideNavigationComponent],
      providers: [NavigationService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavigationComponent);
    component = fixture.componentInstance;
    navigationService = TestBed.inject(NavigationService)
    fixture.detectChanges();
  });

  describe("on init", () => {
    beforeEach(() => {
      spyOn(navigationService, "getNavigationItemsObservable").and.returnValue(of([{ title: "foo" }]));
      spyOn(navigationService, "getFooterItemsObservable").and.returnValue(of([{ title: "foo" }]));
      component.ngOnInit();
    });

    it('should subscribe to the navigation items', () => {
      expect(navigationService.getNavigationItemsObservable).toHaveBeenCalled();
    });

    it('should set navigation items', () => {
      expect(component.navigationItems).toEqual([{ title: "foo" }])
    });

    it('should subscribe to the footer items', () => {
      expect(navigationService.getFooterItemsObservable).toHaveBeenCalled();
    });

    it('should set footer items', () => {
      expect(component.footerItems).toEqual([{ title: "foo" }])
    });
  })
});
