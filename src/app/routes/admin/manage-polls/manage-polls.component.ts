import { Component, inject, type OnInit } from '@angular/core';
import { NavbarComponent } from '@app/shared/ui/admin/navbar/navbar.component';
import { VotingEventService } from '@app/core/services';
import { VotingEvent } from '@app/core/models/interface/voting-event.interface';
import { StandardResponse } from '@app/core/models/authResponseType';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { DatePipe, CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
	selector: 'app-manage-polls',
	standalone: true,
	imports: [
		NavbarComponent,
		MatRippleModule,
		MatTableModule,
		CommonModule,
		DatePipe,
		MatIcon,
		MatButtonModule,
		MatMenuModule,
		MatTooltipModule,
		MatInputModule,
		MatFormFieldModule,
		MatButtonToggleModule,
	],
	templateUrl: './manage-polls.component.html',
	styleUrl: './manage-polls.component.scss',
})
export class ManagePollsComponent implements OnInit {
	private readonly _votingEventService = inject(VotingEventService);
	votingEvents = new MatTableDataSource<VotingEvent>([]);

	columnsToDisplay: string[] = [
		'event_id',
		'title',
		'status',
		'approved',
		'creator_fullname',
		'created_at',
		'start_date',
		'end_date',
		'actions',
	];
	x: string[] = [
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
		'creator_id',
		'creator_uuid',
	];

	ngOnInit(): void {
		this._votingEventService.getAllVotingEvents('all').subscribe({
			next: (res: { code: string; voting_events: VotingEvent[] }) => {
				this.votingEvents.data = res.voting_events;
				console.log('Voting events:', res);
			},
			error: (error: StandardResponse) => {
				console.error('Error loading voting events:', error.message);
			},
		});
	}

	applyFilter($event: KeyboardEvent) {
		const filterValue = ($event.target as HTMLInputElement).value;
		this.votingEvents.filter = filterValue.trim().toLowerCase();
	}
	deleteEvent(event_id: number) {
		console.log('Delete event:', event_id);
	}
	approveEvent(event_id: number) {
		console.log('Approve event:', event_id);
	}

	viewEvent(event_id: number) {
		console.log('View event:', event_id);
	}

	viewUser(creator_uuid: number) {
		console.log('View user:', creator_uuid);
	}
}
