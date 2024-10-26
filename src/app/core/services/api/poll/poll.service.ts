import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'any',
})
export class PollService {
	constructor(private _router: Router) {}
	pollList: { id: number; title: string; options: string[] }[] = [];

	// This will call the api endpoint responsible for creating a new poll to the database
	// This will also return the id for redirection that will be able to reference when the user
	// redirects to /u/edit-poll/:id to edit the poll
	createPoll(title: string): number {
		const id = this.pollList.length + 1;
		this.pollList.push({ id, title, options: [] });
		return id;
	}

	saveModifiedPollData(pollId: number, title: string, options: string[]) {
		this.pollList = this.pollList.map((poll) => {
			if (poll.id === pollId) {
				return { ...poll, title, options };
			}
			return poll;
		});
	}

	getPollData(
		pollId: number,
	): Observable<{ id: number; title: string; options: string[] }> {
		return new Observable((observer) => {
			const poll = this.pollList.find((p) => p.id === pollId);
			if (poll) {
				observer.next(poll);
				console.log(poll);
			} else {
				this._router.navigate(['/u/new/poll']);
			}
		});
	}
}
