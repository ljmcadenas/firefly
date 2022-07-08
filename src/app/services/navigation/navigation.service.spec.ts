import { TestBed } from '@angular/core/testing';

import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let service: NavigationService;
  let defaultNavigationItems = [
    {
      title: "Overview",
      active: true,
    },
    {
      title: "Animals",
      active: false,

    },
    {
      title: "Food",
      active: false,

    },
    {
      title: "Music",
      active: false,

    },
  ];

  let defaultFooterItems = [
    {
      title: "Settings",
    },
    {
      title: "Logout"
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationService);
    spyOn(service, "updateNavigationItems").and.callThrough();
  });

  describe('update navigation items', () => {
    it('emits changes', () => {
      let emitCount = 0;
      service.getNavigationItemsObservable().subscribe(items => {
        emitCount++;
        if (emitCount === 1) {
          expect(items).toEqual(defaultNavigationItems);
          service.updateNavigationItems([{ title: "foo" }])
        } else
          if (emitCount === 2) {
            expect(items).toEqual([{ title: "foo" }]);
          }
      });
    })
  });

  describe('update footer items', () => {
    it('emits changes', () => {
      let emitCount = 0;
      service.getFooterItemsObservable().subscribe(items => {
        emitCount++;
        if (emitCount === 1) {
          expect(items).toEqual(defaultFooterItems);
          service.updateNavigationItems([{ title: "foo" }])
        } else
          if (emitCount === 2) {
            expect(items).toEqual([{ title: "foo" }]);
          }
      });
    })
  });
});
