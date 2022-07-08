import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChangeType } from 'src/app/enums/change-type.enum';
import { OverviewData } from 'src/app/interfaces/overview-data.interface';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {
  public overviewData: OverviewData[] = [];
  
  private unsubscribeSubject = new Subject();

  constructor(private dataService: DataService) { }
  
  public ngOnInit() {
    this.dataService.getOverviewData()
    .pipe(takeUntil(this.unsubscribeSubject))
    .subscribe((data) => {
      this.overviewData = data;
    });
  }

  public ngOnDestroy() {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.unsubscribe();
  }

  public get changeTypes(): typeof ChangeType {
    return ChangeType;
  }
}
