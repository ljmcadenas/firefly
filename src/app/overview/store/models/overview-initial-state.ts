import { TopMusicArtistOrderCriteria } from '../../models/top-music-artist-order-criteria.enum';
import { OverviewState } from './overview-state.interface';

export const OVERVIEW_INITIAL_STATE: OverviewState = {
	kpis: [],
	topMusic: {
		data: [],
		currentOrderCriteria: TopMusicArtistOrderCriteria.Newest,
	},
	connectionError: {
		getKpi: false,
		getTopMusic: false,
	},
	loading: {
		getKpi: false,
		getTopMusic: false,
	},
};
