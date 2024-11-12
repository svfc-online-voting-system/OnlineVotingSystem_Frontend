import { Component, inject, type OnInit } from '@angular/core';
import { NavbarComponent } from '@app/shared/ui/admin/navbar/navbar.component';
import { VotingEventService } from '@app/core/core.module';
import { VotingEvent } from '@app/core/models/interface/voting-event.interface';
import { StandardResponse } from '@app/core/models/authResponseType';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
	selector: 'app-manage-polls',
	standalone: true,
	imports: [
		NavbarComponent,
		MatRippleModule,
		MatTableModule,
		CommonModule,
		DatePipe,
	],
	templateUrl: './manage-polls.component.html',
	styleUrl: './manage-polls.component.scss',
})
export class ManagePollsComponent implements OnInit {
	private readonly _votingEventService = inject(VotingEventService);
	votingEvents: VotingEvent[] = [];
	columnsToDisplay: string[] = [
		'creator_fullname',
		'creator_username',
		'approved',
		'created_at',
		'created_by',
		'description',
		'end_date',
		'event_id',
		'event_type',
		'is_deleted',
		'last_modified_at',
		'start_date',
		'status',
		'title',
		'uuid',
	];

	ngOnInit(): void {
		this._votingEventService.getAllVotingEvents('all').subscribe({
			next: (res: { code: string; voting_events: VotingEvent[] }) => {
				this.votingEvents = res.voting_events;
				console.log('Voting events:', res);
			},
			error: (error: StandardResponse) => {
				console.error('Error loading voting events:', error.message);
			},
		});
	}
}
