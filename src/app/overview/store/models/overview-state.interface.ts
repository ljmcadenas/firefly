import { TopMusicDto } from 'src/app/music/api/dtos/top-music.dto';
import { KpiDto } from '../../api/dtos/kpi.dto';

export interface OverviewState {
	kpis: KpiDto[];
	topMusic: TopMusicDto[];
	connectionError: {
		getKpi: boolean;
		getTopMusic: boolean;
	};
	loading: {
		getKpi: boolean;
		getTopMusic: boolean;
	};
}
