import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
	providedIn: 'any',
})
export class PollService {
	private readonly _httpClient = inject(HttpClient);
	private readonly _router = inject(Router);
	private readonly apiBaseURL = environment.API_BASE_URL;
	pollList: { id: number; title: string; options: string[] }[] = [];
	getPollData(
		pollId: number,
	): Observable<
		{ id: number; title: string; options: string[] }
	> {
		return new Observable((observer) => {
			const poll = this.pollList.find((p) => p.id === pollId);
			if (poll) {
				observer.next(poll);
			}
			this._router.navigate(['/u/new/poll']);
		});
	}
}
