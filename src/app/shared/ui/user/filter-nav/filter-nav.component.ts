import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddNewVoteSheetComponent } from '../../add-new-vote-sheet/add-new-vote-sheet.component';

@Component({
	selector: 'app-filter-nav',
	standalone: true,
	imports: [
		NgFor,
		MatButtonModule,
		MatIconModule,
		MatButtonToggleModule,
		MatCheckboxModule,
		MatIcon,
	],
	templateUrl: './filter-nav.component.html',
	styleUrl: './filter-nav.component.scss',
})
export class FilterNavComponent {
	private _bottomSheet = inject(MatBottomSheet);
	readonly VOTING_SCHEDULE = ['All', 'Upcoming', 'Open', 'Closed'];
	readonly VOTING_TYPE = ['All', 'Electoral', 'Poll'];

	openCreationMenu(): void {
		this._bottomSheet.open(AddNewVoteSheetComponent);
	}
}
