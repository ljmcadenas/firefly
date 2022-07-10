import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API_URLS } from './dtos/api-urls';
import { UserSettingsDto } from './dtos/user-settings.dto';

@Injectable({ providedIn: 'root' })
export class UserSettingsApiService {
	private get apiBaseURL() {
		return environment.services.userSettings;
	}

	constructor(private http: HttpClient) {}

	public getUserSettings(): Observable<UserSettingsDto> {
		const resource = `${this.apiBaseURL}${API_URLS.userSettings}`;
		return this.http.get<UserSettingsDto>(resource);
	}
}
