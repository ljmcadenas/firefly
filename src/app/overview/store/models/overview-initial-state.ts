import { OverviewState } from './overview-state.interface';

export const OVERVIEW_INITIAL_STATE: OverviewState = {
	kpis: [],
	topMusic: [],
	connectionError: {
		getKpi: false,
		getTopMusic: false,
	},
	loading: {
		getKpi: false,
		getTopMusic: false,
	},
};
