import { Component, inject } from '@angular/core';
import {
	MatBottomSheetModule,
	MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-add-new-vote-sheet',
	standalone: true,
	imports: [
		MatBottomSheetModule,
		MatListModule,
		MatButtonModule,
		MatIcon,
		RouterLink,
	],
	templateUrl: './add-new-vote-sheet.component.html',
	styleUrl: './add-new-vote-sheet.component.css',
})
export class AddNewVoteSheetComponent {
	private _bottomSheetRef =
		inject<MatBottomSheetRef<AddNewVoteSheetComponent>>(MatBottomSheetRef);

	openBottomSheet(event: MouseEvent): void {
		this._bottomSheetRef.dismiss();
		event.preventDefault();
	}
}
