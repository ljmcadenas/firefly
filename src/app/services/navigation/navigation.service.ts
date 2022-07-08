import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { NavigationItem } from '../../interfaces/navigation-item.interface';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private _navigationItems: NavigationItem[] = [];
  private _footerItems: NavigationItem[] = [];

  private _navigationItemsSubject: BehaviorSubject<NavigationItem[]> = new BehaviorSubject(this._navigationItems);
  private _footerItemsSubject: BehaviorSubject<NavigationItem[]> = new BehaviorSubject(this._footerItems);

  private defaultNavigationItems: NavigationItem[] = [
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

  private defaultFooterItems: NavigationItem[] = [
    {
      title: "Settings",
    },
    {
      title: "Logout"
    },
  ];

  constructor() {
    this.updateNavigationItems(this.defaultNavigationItems);
    this.updateFooterItems(this.defaultFooterItems);
  }

  public getNavigationItemsObservable(): Observable<NavigationItem[]> {
    return this._navigationItemsSubject;
  }

  public getFooterItemsObservable(): Observable<NavigationItem[]> {
    return this._footerItemsSubject;
  }

  private set navigationItems(navigationItems: NavigationItem[]) {
    this._navigationItems = navigationItems;
    this._navigationItemsSubject.next(navigationItems);
  }
  
  private set footerItems(footerItems: NavigationItem[]) {
    this._footerItems = footerItems;
    this._footerItemsSubject.next(footerItems);
  }

  public updateNavigationItems(navigationItems: NavigationItem[]) {
    this.navigationItems = navigationItems;
  }

  public updateFooterItems(footerItems: NavigationItem[]) {
    this.footerItems = footerItems;
  }
}
