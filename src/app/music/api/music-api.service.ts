import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API_URLS } from './api-urls';
import { TopMusicDto } from './dtos/top-music.dto';

@Injectable({ providedIn: 'root' })
export class MusicApiService {
	private get apiBaseURL() {
		return environment.services.music;
	}

	constructor(private http: HttpClient) {}

	public getTopMusic(): Observable<TopMusicDto[]> {
		const resource = `${this.apiBaseURL}${API_URLS.topMusic}`;
		return this.http.get<TopMusicDto[]>(resource);
	}
}
