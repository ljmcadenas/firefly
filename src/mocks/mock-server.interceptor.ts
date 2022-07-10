import { Observable, of } from 'rxjs';

import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TOP_MUSIC_DTOS } from './music.mock';
import { KPI_DTOS } from './overview.mock';
import { USER_SETTINGS_DTO } from './user-settings.mock';

const MOCK_RESOURCES = {
	[`${environment.services.overview}/kpi`]: KPI_DTOS,
	[`${environment.services.userSettings}`]: USER_SETTINGS_DTO,
	[`${environment.services.music}?view=top`]: TOP_MUSIC_DTOS,
};

@Injectable({
	providedIn: 'root',
})
export class MockServerInterceptor implements HttpInterceptor {
	public intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const { urlWithParams } = req;

		if (MOCK_RESOURCES[urlWithParams]) {
			return of(
				new HttpResponse({
					status: 200,
					body: MOCK_RESOURCES[urlWithParams],
				})
			);
		}

		return next.handle(req);
	}
}
