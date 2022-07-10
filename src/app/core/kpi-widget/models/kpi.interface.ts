import { KpiState } from './kpi-state.interface';

export interface Kpi {
	current: KpiState;
	previous: KpiState;
	label: string;
	meetTarget: boolean;
	valueDiff: number;
}
