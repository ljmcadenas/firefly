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
import { KPI_DTOS } from './mock-overview';

const MOCK_RESOURCES = {
	[`${environment.services.overview}/kpi`]: KPI_DTOS,
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
