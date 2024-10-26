import { Component, inject, ViewChild, type ElementRef } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
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
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatAutocompleteModule,
		ReactiveFormsModule,
		AsyncPipe,
		MatIcon,
	],
	templateUrl: './filter-nav.component.html',
	styleUrl: './filter-nav.component.scss',
})
export class FilterNavComponent {
	@ViewChild('filterVoteCreator')
	filterVoteCreatorInput!: ElementRef<HTMLInputElement>;
	private _bottomSheet = inject(MatBottomSheet);

	filteredOptions: string[];
	readonly VOTING_SCHEDULE = ['All', 'Upcoming', 'Open', 'Closed'];
	readonly VOTING_TYPE = ['All', 'Electoral', 'Poll'];
	readonly STATIC_VOTE_CREATORS = ['All', 'Me', 'Others'];
	readonly STATIC_USERNAMES = [
		'john_doe',
		'jane_doe',
		'joe_doe',
		'jane_smith',
		'john_smith',
		'joe_smith',
	];
	constructor() {
		this.filteredOptions = this.STATIC_VOTE_CREATORS.slice();
	}

	filterCreator(): void {
		const filterValue = this.filterVoteCreatorInput.nativeElement.value;
		this.filteredOptions = this.STATIC_USERNAMES.filter((voteCreator) =>
			voteCreator.toLowerCase().includes(filterValue.toLowerCase()),
		);
	}

	openCreationMenu(): void {
		this._bottomSheet.open(AddNewVoteSheetComponent);
	}
}
