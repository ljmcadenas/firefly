import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GridColDef } from '../core/grid/models/grid-col-def.interface';
import { GridData } from '../core/grid/models/grid-data.interface';
import { Kpi } from '../core/kpi-widget/models/kpi.interface';
import { MusicApiService } from '../music/api/music-api.service';
import { StateTracker } from './store/models/state-tracker.interface';
import { OverviewStoreService } from './store/overview-store.service';

@Component({
	selector: 'firefly-overview',
	templateUrl: 'overview.component.html',
	styleUrls: ['overview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [OverviewStoreService],
})
export class OverviewComponent implements OnInit {
	public kpiData$!: Observable<Kpi[]>;
	public loadingState$!: Observable<StateTracker>;
	public connectionErrorState$!: Observable<StateTracker>;
	public artistGridColDef!: GridColDef[];
	public artistGridData$!: Observable<GridData[]>;

	constructor(
		private overviewStoreService: OverviewStoreService,
		private musicApiService: MusicApiService
	) {}

	public ngOnInit(): void {
		this.kpiData$ = this.overviewStoreService.kpis$;
		this.loadingState$ = this.overviewStoreService.loading$;
		this.connectionErrorState$ = this.overviewStoreService.connectionError$;
		this.setupTopMusic();
	}

	public trackKpi(_i: number, value: Kpi): number {
		return value.current.time.getTime();
	}

	private setupTopMusic(): void {
		this.artistGridColDef = [
			{
				field: 'id',
				label: '#',
				width: '5%',
			},
			{
				field: 'artist',
				label: 'ARTIST',
				width: '60%',
			},
			{
				field: 'plays',
				label: 'PLAYS',
				width: '10%',
			},
			{
				field: 'songs',
				label: 'SONGS',
				width: '10%',
			},
		];

		this.artistGridData$ = this.overviewStoreService.topMusic$.pipe(
			map((dtos) =>
				dtos.map(({ id, ...rest }) => ({ id, ...rest } as GridData))
			)
		);
	}
}
