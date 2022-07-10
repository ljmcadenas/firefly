import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GridColDef } from '../core/grid/models/grid-col-def.interface';
import { GridData } from '../core/grid/models/grid-data.interface';
import { Kpi } from '../core/kpi-widget/models/kpi.interface';
import { MusicApiService } from '../music/api/music-api.service';
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
	public artistGridColDef!: GridColDef[];
	public artistGridData$!: Observable<GridData[]>;

	constructor(
		private overviewApiService: OverviewApiService,
		private musicApiService: MusicApiService
	) {}

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
		this.setupTopMusic();
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

		this.artistGridData$ = this.musicApiService
			.getTopMusic()
			.pipe(
				map((dtos) =>
					dtos.map(({ id, ...rest }) => ({ id, ...rest } as GridData))
				)
			);
	}
}
