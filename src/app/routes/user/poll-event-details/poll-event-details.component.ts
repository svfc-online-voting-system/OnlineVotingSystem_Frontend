import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, DoughnutController } from 'chart.js';
import { ArcElement, Legend, Tooltip } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart } from 'chart.js/auto';
import { isPlatformBrowser } from '@angular/common';
import {
	PollService,
	SnackbarService,
	VotingEventService,
} from '@app/core/services';
import { VotingEventDetails } from '@app/core/models/interface/voting-event.interface';
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
		BaseChartDirective,
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
	readonly _platformId = inject(PLATFORM_ID);
	private readonly _votingEventService = inject(VotingEventService);
	private readonly _pollService = inject(PollService);
	private readonly _snackBarService = inject(SnackbarService);
	readonly _router = inject(Router);
	totalVotes = 0;
	isBrowser = false;
	constructor() {
		this.isBrowser = isPlatformBrowser(this._platformId);
		if (this.isBrowser) {
			Chart.register(DoughnutController, ArcElement, Legend, Tooltip);
		}
	}
	public chartData: ChartData<'doughnut'> = {
		labels: [],
		datasets: [
			{
				data: [],
				backgroundColor: [
					'#FF6384',
					'#36A2EB',
					'#FFCE56',
					'#4BC0C0',
					'#9966FF',
					'#FF9F40',
					'#FF6384',
					'#36A2EB',
					'#FFCE56',
					'#4BC0C0',
				],
			},
		],
	};

	public chartOptions: ChartConfiguration['options'] = {
		responsive: true,
		maintainAspectRatio: true,
		aspectRatio: 1,
		plugins: {
			legend: {
				display: true,
				position: 'right',
			},
		},
	};
	eventUuid = '';
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
		poll_options: [],
		creator_username: '',
		has_user_voted: false,
		vote_data: {
			user_id: 0,
			event_uuid: '',
			poll_option_id: 0,
		},
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
						this.eventDetails.uuid = this.eventDetails.uuid.replace(
							/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/,
							'$1-$2-$3-$4-$5',
						);

						console.log('Response:', response);
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

		if (isPlatformBrowser(this._platformId)) {
			this._pollService.getPollCurrentTally(this.eventUuid).subscribe({
				next: (response) => {
					console.log('Current tally:', response);
					const tallyData = Object.values(response.tally_info);
					this.chartData.labels = tallyData.map((item) => item.text);
					this.chartData.datasets[0].data = tallyData.map(
						(item) => item.count,
					);

					this.totalVotes = tallyData.reduce(
						(acc, item) => acc + item.count,
						0,
					);
				},
				error: (error) => {
					console.error('Error getting current tally:', error);
				},
			});
		}
	}
}
