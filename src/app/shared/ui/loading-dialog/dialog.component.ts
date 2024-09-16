import { Component, inject } from '@angular/core';
import {
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle,
} from '@angular/material/dialog';

@Component({
	selector: 'app-dialog',
	standalone: true,
	imports: [MatDialogTitle, MatDialogContent],
	template: `
		<mat-dialog-content class="grid place-content-center">
		</mat-dialog-content>
	`,
})
export class DialogComponent {
	readonly dialogRef = inject(MatDialogRef<DialogComponent>);
}
