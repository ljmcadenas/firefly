import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	LOCALE_ID,
	OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GridColDef } from '../core/grid/models/grid-col-def.interface';
import { GridData } from '../core/grid/models/grid-data.interface';
import { Kpi } from '../core/kpi-widget/models/kpi.interface';
import { StateTracker } from './store/models/state-tracker.interface';
import { OverviewStoreService } from './store/overview-store.service';

import { formatNumber } from '@angular/common';
import { TopMusicArtistOrderCriteria } from './models/top-music-artist-order-criteria.enum';

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
	public topMusicCurrentOrderCriteria$!: Observable<TopMusicArtistOrderCriteria>;
	public TopMusicArtistOrderCriteria = TopMusicArtistOrderCriteria;

	constructor(
		private overviewStoreService: OverviewStoreService,
		@Inject(LOCALE_ID) public locale: string
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

	public onArtistOrderCriteriaChange(
		orderCriteria: TopMusicArtistOrderCriteria
	): void {
		this.overviewStoreService.setTopMusicCurrentOrderCriteria(
			orderCriteria
		);
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
				textAlign: 'right',
			},
			{
				field: 'songs',
				label: 'SONGS',
				width: '10%',
				textAlign: 'right',
			},
		];

		this.artistGridData$ =
			this.overviewStoreService.topMusicDataSorted$.pipe(
				map((dtos) =>
					dtos.map(
						({ id, plays, ...rest }) =>
							({
								id,
								plays: formatNumber(plays, this.locale),
								...rest,
							} as GridData)
					)
				)
			);

		this.topMusicCurrentOrderCriteria$ =
			this.overviewStoreService.topMusicCurrentOrderCriteria$;
	}
}
