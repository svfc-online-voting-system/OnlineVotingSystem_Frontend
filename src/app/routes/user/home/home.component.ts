import { Component, inject, type OnInit } from '@angular/core';
import { NavbarComponent } from '@app/shared/ui/user/navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { VotingEventCard } from '@app/core/models/interface/voting-event-card.interface';
import { VotingEventService } from '@app/core/services/api/poll/voting-event/voting-event.service';
import { DatePipe, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddNewVoteSheetComponent } from '@app/shared/ui/add-new-vote-sheet/add-new-vote-sheet.component';
@Component({
	selector: 'app-user-home',
	standalone: true,
	imports: [
		NavbarComponent,
		MatCardModule,
		NgFor,
		DatePipe,
		MatButtonModule,
		RouterModule,
		MatChipsModule,
		NgFor,
		MatButtonModule,
		MatIconModule,
		MatButtonToggleModule,
		MatCheckboxModule,
		MatIcon,
	],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class UserHomeComponent implements OnInit {
	private readonly _votingEventService = inject(VotingEventService);
	private readonly _bottomSheet = inject(MatBottomSheet);
	votingEvents: VotingEventCard[] = [];
	readonly VOTING_SCHEDULE = ['All', 'Upcoming', 'Ongoing', 'Completed'];
	readonly VOTING_TYPE = ['All', 'Electoral', 'Poll'];
	selectedTypes: string[] = ['All'];
	selectedSchedules: string[] = ['All'];

	openCreationMenu(): void {
		this._bottomSheet.open(AddNewVoteSheetComponent);
	}

	filterEvents(type?: string[], schedule?: string[]): void {
		if (type) {
			this.selectedTypes = type;
			if (type.includes('All')) {
				this.selectedTypes = ['All'];
			} else if (this.selectedTypes.length === 0) {
				this.selectedTypes = ['All'];
			}
		}

		if (schedule) {
			this.selectedSchedules = schedule;
			if (schedule.includes('All')) {
				this.selectedSchedules = ['All'];
			} else if (this.selectedSchedules.length === 0) {
				this.selectedSchedules = ['All'];
			}
		}

		const typeFilter = this.selectedTypes.includes('All')
			? 'all'
			: this.selectedTypes.map((t) => t.toLowerCase()).join(',');

		const scheduleFilter = this.selectedSchedules.includes('All')
			? 'all'
			: this.selectedSchedules.map((s) => s.toLowerCase()).join(',');

		this._votingEventService
			.getAllVotingEventsUser(typeFilter, scheduleFilter)
			.subscribe((response) => {
				this.votingEvents = response.voting_events;
			});
	}

	getLatestVotingEvents(): void {
		this._votingEventService
			.getAllVotingEventsUser('all', 'all')
			.subscribe((response) => {
				this.votingEvents = response.voting_events;
			});
	}

	ngOnInit(): void {
		this.filterEvents(['All'], ['All']);
	}
}
