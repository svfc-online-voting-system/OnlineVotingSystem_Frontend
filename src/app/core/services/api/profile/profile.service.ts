import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProfileSettings } from '@app/core/models/interface/profile-settings-interface';

@Injectable({
	providedIn: 'root',
})
export class ProfileService {
	private readonly _httpClient = inject(HttpClient);
	private readonly _apiBaseUrl = `${environment.API_BASE_URL}`;
	private readonly _apiPort = `${environment.API_PORT}`;
	private readonly _apiGetMyProfile = `${environment.API_GET_MY_PROFILE}`;

	getMyDetails(): Observable<{
		code: string;
		profile_data: ProfileSettings;
	}> {
		return this._httpClient
			.get<{ code: string; profile_data: ProfileSettings }>(
				`${this._apiBaseUrl}:${this._apiPort}${this._apiGetMyProfile}`,
				{ withCredentials: true },
			)
			.pipe(
				catchError((error) => {
					throw error;
				}),
			);
	}
}
