import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
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
	public readonly kpis$: Observable<Kpi[]> = this.select((state) => {
		return state.kpis.map((kpi) => ({
			...kpi,
			meetTarget: this.doesMeetTarget(kpi),
			valueDiff: this.calculateValueDiff(kpi),
		}));
	});

	public readonly topMusicData$: Observable<TopMusicDto[]> = this.select(
		(state) => state.topMusic.data
	);

	public readonly topMusicCurrentOrderCriteria$: Observable<TopMusicArtistOrderCriteria> =
		this.select((state) => state.topMusic.currentOrderCriteria);

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

	public readonly setTopMusicCurrentOrderCriteria = this.updater(
		(state, criteria: TopMusicArtistOrderCriteria) => ({
			...state,
			topMusic: {
				...state.topMusic,
				currentOrderCriteria: criteria,
			},
		})
	);

	// TODO: improve typings for error and loading states by making them strong typed
	public readonly connectionError$: Observable<StateTracker> = this.select(
		(state) => state.connectionError
	);

	public readonly loading$: Observable<StateTracker> = this.select(
		(state) => state.loading
	);

	// TODO reduce boilerplate code
	private readonly getKpis = this.effect(() => {
		this.updateLoadingState('getKpi', true);
		this.updateConnectionErrorState('getKpi', false);

		return this.overviewApiService.getKpi().pipe(
			delay(this.fakeServerDelay()),
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

	private readonly getTopMusic = this.effect(() => {
		this.updateLoadingState('getTopMusic', true);
		this.updateConnectionErrorState('getTopMusic', false);

		return this.musicApiService.getTopMusic().pipe(
			delay(this.fakeServerDelay()),
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

	private fakeServerDelay(): number {
		return Math.ceil(Math.random() * 5) * 1000;
	}

	private sortTopMusicDataBy(
		data: TopMusicDto[],
		predicate: (a: TopMusicDto, b: TopMusicDto) => number
	): TopMusicDto[] {
		return [...data].sort(predicate);
	}
}
