import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StandardResponse } from '@app/core/models/authResponseType';
import {
	VotingEvent,
	VotingEventDetails,
} from '@app/core/models/interface/voting-event.interface';
import { VotingEventCard } from '@app/core/models/interface/voting-event-card.interface';

@Injectable({
	providedIn: 'any',
})
export class VotingEventService {
	private readonly _httpClient = inject(HttpClient);
	private readonly apiBaseURL = environment.API_BASE_URL;
	private readonly apiPort = environment.API_PORT;
	private readonly adminApiGetAllVotingEvents =
		environment.API_GET_ALL_VOTING_EVENTS;

	private readonly userApiGetAllVotingEvents =
		environment.API_GET_ALL_VOTING_EVENTS_USER;
	private readonly userApiGetVotingEvent = environment.API_GET_VOTING_EVENT;

	getAllVotingEvents(
		by: string,
	): Observable<{ code: string; voting_events: VotingEvent[] }> {
		const url = `${this.apiBaseURL}:${this.apiPort}/${this.adminApiGetAllVotingEvents}?by=${by}`;
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

	getAllVotingEventsUser(
		voting_event_type: string,
		voting_status: string,
	): Observable<{
		code: string;
		voting_events: VotingEventCard[];
	}> {
		const params = new URLSearchParams({
			voting_event_type,
			voting_status,
		});

		const url = `${this.apiBaseURL}:${this.apiPort}/${
			this.userApiGetAllVotingEvents
		}?${params.toString()}`;

		return this._httpClient
			.get<{ code: string; voting_events: VotingEventCard[] }>(url, {
				withCredentials: true,
			})
			.pipe(
				catchError((error: StandardResponse) => {
					console.error('Error:', error);
					return throwError(() => error);
				}),
			);
	}

	getVotingEvent(
		uuid: string,
		event_type: string,
	): Observable<{ code: string; voting_event: VotingEventDetails }> {
		const url = `${this.apiBaseURL}:${this.apiPort}/${this.userApiGetVotingEvent}?uuid=${uuid}&event_type=${event_type}`;

		return this._httpClient
			.get<{ code: string; voting_event: VotingEventDetails }>(url, {
				withCredentials: true,
			})
			.pipe(
				catchError((error: StandardResponse) => {
					console.error('Error:', error);
					return throwError(() => error);
				}),
			);
	}

	//  function to check whether a user was already participated in a voting event
	checkUserParticipation(eventUuid: string, event_type: string) {
		const url = `${this.apiBaseURL}:${this.apiPort}/${
			this.userApiGetVotingEvent
		}?uuid=${eventUuid}&event_type=${event_type}`;

		return this._httpClient
			.get<{ code: string; voting_event: VotingEventDetails }>(url, {
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
