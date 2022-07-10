import { TopMusicDto } from 'src/app/music/api/dtos/top-music.dto';
import { KpiDto } from '../../api/dtos/kpi.dto';
import { TopMusicArtistOrderCriteria } from '../../models/top-music-artist-order-criteria.enum';

export interface OverviewState {
	kpis: KpiDto[];
	topMusic: {
		data: TopMusicDto[];
		currentOrderCriteria: TopMusicArtistOrderCriteria;
	};
	connectionError: {
		getKpi: boolean;
		getTopMusic: boolean;
	};
	loading: {
		getKpi: boolean;
		getTopMusic: boolean;
	};
}
