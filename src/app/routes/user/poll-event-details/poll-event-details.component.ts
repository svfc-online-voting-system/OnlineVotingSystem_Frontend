import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SnackbarService, VotingEventService } from '@app/core/services';
import {
	VotingEventDetails,
	PollEventOptions,
} from '@app/core/models/interface/voting-event.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '@app/shared/ui/user/navbar/navbar.component';
import { Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
	selector: 'app-poll-event-details',
	standalone: true,
	imports: [
		CommonModule,
		MatCardModule,
		MatButtonModule,
		NavbarComponent,
		TitleCasePipe,
		MatRadioModule,
		MatTooltipModule,
	],
	templateUrl: './poll-event-details.component.html',
	styleUrl: './poll-event-details.component.scss',
})
export class PollEventDetailsComponent implements OnInit {
	private readonly _route = inject(ActivatedRoute);
	private readonly _votingEventService = inject(VotingEventService);
	private readonly _snackBarService = inject(SnackbarService);
	readonly _router = inject(Router);
	eventUuid = '';
	pollOptions: PollEventOptions[] = [];
	eventDetails: VotingEventDetails = {
		created_at: '',
		created_by: 0,
		description: '',
		end_date: '',
		event_type: '',
		last_modified_at: '',
		start_date: '',
		status: '',
		title: '',
		uuid: '',
		poll_options: this.pollOptions,
	};

	ngOnInit(): void {
		this.eventUuid = this._route.snapshot.params['uuid'];

		this._votingEventService
			.getVotingEvent(this.eventUuid, 'poll')
			.subscribe({
				next: (response: {
					code: string;
					voting_event: VotingEventDetails;
				}) => {
					if (response.code === 'success') {
						this.eventDetails = response.voting_event;
						console.log('Event details:', this.eventDetails);
					}
				},
				error: (error: {
					error: { code: string; message: string };
				}) => {
					if (error.error.code === 'voting_event_does_not_exists') {
						this._snackBarService.showSnackBar(
							'Voting event does not exist',
						);
						this._router.navigateByUrl('/u/home');
					} else {
						this._snackBarService.showSnackBar(
							'Failed to get voting event details',
						);
						this._router.navigateByUrl('/u/home');
					}
				},
			});
	}
}
