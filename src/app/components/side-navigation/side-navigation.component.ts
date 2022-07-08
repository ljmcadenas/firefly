import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavigationItem } from 'src/app/interfaces/navigation-item.interface';
import { NavigationService } from 'src/app/services/navigation/navigation.service';

@Component({
  selector: 'side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit, OnDestroy {

  public navigationItems: NavigationItem[] = [];
  public footerItems: NavigationItem[] = [];
  public showNavigation = false;
  
  private unsubscribeSubject = new Subject();

  constructor(private navigationService: NavigationService) { }
  
  public ngOnInit() {
    this.navigationService.getNavigationItemsObservable()
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe((navigationItems: NavigationItem[]) => {
        this.navigationItems = navigationItems;
      });
  
    this.navigationService.getFooterItemsObservable()
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe((footerItems: NavigationItem[]) => {
        this.footerItems = footerItems;
      });
  }

  public ngOnDestroy() {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.unsubscribe();
  }
}
