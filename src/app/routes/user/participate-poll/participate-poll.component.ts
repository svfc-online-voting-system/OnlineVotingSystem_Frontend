import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
	PollEventOptions,
	VotingEventDetails,
} from '@app/core/models/interface/voting-event.interface';
import {
	VotingEventService,
	SnackbarService,
	PollService,
} from '@app/core/services';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavbarComponent } from '@app/shared/ui/user/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-participate-poll',
	standalone: true,
	imports: [
		MatCardModule,
		MatButtonModule,
		MatRadioModule,
		TitleCasePipe,
		FormsModule,
		NgFor,
		MatTooltipModule,
		NavbarComponent,
		UpperCasePipe,
		DatePipe,
		MatIconModule,
	],
	templateUrl: './participate-poll.component.html',
	styleUrl: './participate-poll.component.scss',
})
export class ParticipatePollComponent implements OnInit {
	private readonly _route = inject(ActivatedRoute);
	private readonly _votingEventService = inject(VotingEventService);
	private readonly _snackBarService = inject(SnackbarService);
	private readonly _pollService = inject(PollService);
	private readonly _hasAlreadyVoted = false;
	readonly _router = inject(Router);
	selectedOptionID = 0;

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
		creator_username: '',
		has_user_voted: this._hasAlreadyVoted,
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

						if (this.eventDetails.status === 'completed') {
							this._snackBarService.showSnackBar(
								'This poll has ended',
							);
							this._router.navigateByUrl('/u/home');
						} else if (this.eventDetails.status === 'upcoming') {
							this._snackBarService.showSnackBar(
								'This poll has not started yet',
							);
							this._router.navigateByUrl('/u/home');
						} else {
							console.log('Event details:', this.eventDetails);
						}
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

	castVote(): void {
		console.log(typeof this.selectedOptionID);
		if (this.selectedOptionID === 0 || this.selectedOptionID === null) {
			this._snackBarService.showSnackBar('Please select an option');
			return;
		}

		this._pollService
			.castPollVote(this.eventUuid, this.selectedOptionID)
			.subscribe({
				next: (response: { code: string; message: string }) => {
					if (response.code === 'success') {
						this._snackBarService.showSnackBar(
							'Vote casted successfully',
						);
						this._router.navigateByUrl('/u/home');
					} else {
						this._snackBarService.showSnackBar(
							'Failed to cast vote',
						);
					}
				},
				error: (error: {
					error: { code: string; message: string };
				}) => {
					this._snackBarService.showSnackBar('Failed to cast vote');
					console.error(error);
				},
			});
	}
}
