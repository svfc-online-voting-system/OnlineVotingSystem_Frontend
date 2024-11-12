import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StandardResponse } from '@app/core/models/authResponseType';
import { VotingEvent } from '@app/core/models/interface/voting-event.interface';

@Injectable({
	providedIn: 'any',
})
export class VotingEventService {
	private readonly _httpClient = inject(HttpClient);
	private readonly apiBaseURL = environment.API_BASE_URL;
	private readonly apiPort = environment.API_PORT;
	private readonly apiGetAllVotingEvents =
		environment.API_GET_ALL_VOTING_EVENTS;

	getAllVotingEvents(
		by: string,
	): Observable<{ code: string; voting_events: VotingEvent[] }> {
		const url = `${this.apiBaseURL}:${this.apiPort}/${this.apiGetAllVotingEvents}?by=${by}`;
		return this._httpClient
			.get<{ code: string; voting_events: VotingEvent[] }>(url, {
				withCredentials: true,
			})
			.pipe(
				catchError((error: StandardResponse) => {
					console.error('Error:', error);
					return throwError(() => error);
				}),
			);
	}
}
