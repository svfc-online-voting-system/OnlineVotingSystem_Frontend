import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '@env/environment';
import { StandardResponse } from '@app/core/models/authResponseType';
import { CookieService } from '@app/core/core.module';

@Injectable({
	providedIn: 'any',
})
export class PollService {
	private readonly _httpClient = inject(HttpClient);
	private readonly _cookieService = inject(CookieService);
	private readonly _router = inject(Router);
	private readonly apiBaseURL = environment.API_BASE_URL;
	private readonly apiPort = environment.API_PORT;
	private readonly apiCastPoll = environment.API_CAST_POLL_VOTE;

	pollList: { id: number; title: string; options: string[] }[] = [];

	getPollData(
		pollId: number,
	): Observable<{ id: number; title: string; options: string[] }> {
		return new Observable((observer) => {
			const poll = this.pollList.find((p) => p.id === pollId);
			if (poll) {
				observer.next(poll);
			}
			this._router.navigate(['/u/new/poll']);
		});
	}

	castPollVote(
		eventUuid: string,
		pollOptionId: number,
	): Observable<StandardResponse> {
		console.log('Casting vote for:', eventUuid, pollOptionId);
		console.log(typeof eventUuid, typeof pollOptionId);

		const csrfToken = this._cookieService.getCookie('X-CSRF-TOKEN');
		const headers = new HttpHeaders({
			'X-CSRF-TOKEN': csrfToken,
		});

		return this._httpClient.post<StandardResponse>(
			`${this.apiBaseURL}:${this.apiPort}/${this.apiCastPoll}`,
			{
				event_uuid: eventUuid,
				poll_option_id: pollOptionId,
			},
			{
				withCredentials: true,
				headers: headers,
			},
		);
	}
}
