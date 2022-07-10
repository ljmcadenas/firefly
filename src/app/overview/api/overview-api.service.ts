import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kpi } from 'src/app/core/kpi-widget/models/kpi.interface';
import { environment } from 'src/environments/environment';
import { API_URLS } from './api-urls';
import { KpiDto } from './dtos/kpi.dto';

@Injectable({ providedIn: 'root' })
export class OverviewApiService {
	private get apiBaseURL() {
		return environment.services.overview;
	}

	constructor(private http: HttpClient) {}

	public getKpi(): Observable<KpiDto[]> {
		const resource = `${this.apiBaseURL}${API_URLS.kpi}`;
		return this.http.get<Kpi[]>(resource);
	}
}
