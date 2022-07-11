import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Kpi } from 'src/app/core/kpi-widget/models/kpi.interface';
import { TopMusicDto } from 'src/app/music/api/dtos/top-music.dto';
import { MusicApiService } from 'src/app/music/api/music-api.service';
import { KpiDto } from '../api/dtos/kpi.dto';
import { OverviewApiService } from '../api/overview-api.service';
import { TopMusicArtistOrderCriteria } from '../models/top-music-artist-order-criteria.enum';
import { OVERVIEW_INITIAL_STATE } from './models/overview-initial-state';
import { OverviewState } from './models/overview-state.interface';
import { StateTracker } from './models/state-tracker.interface';

@Injectable()
export class OverviewStoreService extends ComponentStore<OverviewState> {
	/* Selectors */

	// Kpis
	public readonly kpis$: Observable<KpiDto[]> = this.select(
		(state) => state.kpis
	);

	// KpisForWidget
	public readonly kpisForWidget$: Observable<Kpi[]> = this.select(
		this.kpis$,
		(kpis) => {
			return kpis.map((kpi) => ({
				...kpi,
				meetTarget: this.doesMeetTarget(kpi),
				valueDiff: this.calculateValueDiff(kpi),
			}));
		}
	);

	// TopMusic
	public readonly topMusic$: Observable<OverviewState['topMusic']> =
		this.select((state) => state.topMusic);

	// TopMusicData
	public readonly topMusicData$: Observable<TopMusicDto[]> = this.select(
		this.topMusic$,
		(state) => state.data
	);

	// topMusicCurrentOrderCriteria
	public readonly topMusicCurrentOrderCriteria$: Observable<TopMusicArtistOrderCriteria> =
		this.select(this.topMusic$, (state) => state.currentOrderCriteria);

	// topMusicDataSorted
	public readonly topMusicDataSorted$: Observable<TopMusicDto[]> =
		this.select(
			this.topMusicData$,
			this.topMusicCurrentOrderCriteria$,
			(data, criteria) => {
				switch (criteria) {
					case TopMusicArtistOrderCriteria.MoreSongs:
						return this.sortTopMusicDataBy(
							data,
							(a, b) => a.songs - b.songs
						);
						break;
					case TopMusicArtistOrderCriteria.MostPlayed:
						return this.sortTopMusicDataBy(
							data,
							(a, b) => a.plays - b.plays
						);
						break;
					default:
						return this.sortTopMusicDataBy(
							data,
							(a, b) => parseInt(a.id, 10) - parseInt(b.id, 10)
						);
						break;
				}
			}
		);

	// TODO: improve typings for error and loading states by making them strong typed
	// ConnectionError
	public readonly connectionError$: Observable<StateTracker> = this.select(
		(state) => state.connectionError
	);

	// Loading
	public readonly loading$: Observable<StateTracker> = this.select(
		(state) => state.loading
	);

	/* Actions */

	// setTopMusicCurrentOrderCriteria
	public readonly setTopMusicCurrentOrderCriteria = this.updater(
		(state, criteria: TopMusicArtistOrderCriteria) => ({
			...state,
			topMusic: {
				...state.topMusic,
				currentOrderCriteria: criteria,
			},
		})
	);

	/* Effects */

	// TODO reduce boilerplate code
	// getKpis
	private readonly getKpis = this.effect(() => {
		this.updateLoadingState('getKpi', true);
		this.updateConnectionErrorState('getKpi', false);

		return this.overviewApiService.getKpi().pipe(
			tap({
				next: (kpis) => {
					this.updateLoadingState('getKpi', false);
					this.processKpiResponse(kpis);
				},
				error: (e) => {
					this.updateLoadingState('getKpi', false);
					this.updateConnectionErrorState('getKpi', true);
				},
			}),
			catchError(() => EMPTY)
		);
	});

	// getTopMusic
	private readonly getTopMusic = this.effect(() => {
		this.updateLoadingState('getTopMusic', true);
		this.updateConnectionErrorState('getTopMusic', false);

		return this.musicApiService.getTopMusic().pipe(
			tap({
				next: (topMusic) => {
					this.updateLoadingState('getTopMusic', false);
					this.processTopMusicResponse(topMusic);
				},
				error: (e) => {
					this.updateLoadingState('getTopMusic', false);
					this.updateConnectionErrorState('getTopMusic', true);
				},
			}),
			catchError(() => EMPTY)
		);
	});

	constructor(
		private overviewApiService: OverviewApiService,
		private musicApiService: MusicApiService
	) {
		super({ ...OVERVIEW_INITIAL_STATE });
	}

	private processKpiResponse(response: KpiDto[]): void {
		this.patchState({ kpis: response });
	}

	private processTopMusicResponse(response: TopMusicDto[]): void {
		this.patchState((state) => ({
			...state,
			topMusic: {
				...state.topMusic,
				data: response,
			},
		}));
	}

	private updateLoadingState(key: string, value: boolean): void {
		this.patchState((state) => ({
			loading: {
				...state.loading,
				[key]: value,
			},
		}));
	}

	private updateConnectionErrorState(key: string, value: boolean): void {
		this.patchState((state) => ({
			connectionError: {
				...state.connectionError,
				[key]: value,
			},
		}));
	}

	private doesMeetTarget(kpi: KpiDto): boolean {
		return kpi.current.value > kpi.previous.value;
	}

	private calculateValueDiff(kpi: KpiDto): number {
		return Math.abs(kpi.current.value - kpi.previous.value);
	}

	private sortTopMusicDataBy(
		data: TopMusicDto[],
		predicate: (a: TopMusicDto, b: TopMusicDto) => number
	): TopMusicDto[] {
		return [...data].sort(predicate);
	}
}
