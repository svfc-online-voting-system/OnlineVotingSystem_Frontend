import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class SnackbarService {
	constructor(
		private _snackBar: MatSnackBar,
		@Inject(DOCUMENT) private _doc: Document
	) {}

	showSnackBar(message: string): void {
		this._snackBar.open(message, 'Close', {
			duration: 3000,
			horizontalPosition: 'center',
			verticalPosition: 'top',
		});
	}

	closeSnackBar(): void {
		this._snackBar.dismiss();
	}
}
