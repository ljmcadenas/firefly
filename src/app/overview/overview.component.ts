import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Kpi } from '../core/kpi-widget/models/kpi.interface';
import { KpiDto } from './api/dtos/kpi.dto';
import { OverviewApiService } from './api/overview-api.service';

@Component({
	selector: 'firefly-overview',
	templateUrl: 'overview.component.html',
	styleUrls: ['overview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent implements OnInit {
	public kpiData$!: Observable<Kpi[]>;

	constructor(private overviewApiService: OverviewApiService) {}

	public ngOnInit(): void {
		this.kpiData$ = this.overviewApiService.getKpi().pipe(
			map((kpis) => {
				return kpis.map((kpi) => ({
					...kpi,
					meetTarget: this.doesMeetTarget(kpi),
					valueDiff: this.calculateValueDiff(kpi),
				}));
			})
		);
	}

	public trackKpi(_i: number, value: Kpi): number {
		return value.current.time.getTime();
	}

	private doesMeetTarget(kpi: KpiDto): boolean {
		return kpi.current.value > kpi.previous.value;
	}

	private calculateValueDiff(kpi: KpiDto): number {
		return Math.abs(kpi.current.value - kpi.previous.value);
	}
}
