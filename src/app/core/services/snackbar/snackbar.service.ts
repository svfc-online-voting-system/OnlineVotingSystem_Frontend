import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
	providedIn: 'root',
})
export class SnackbarService {
	isBrowser: boolean;
	constructor(
		private _snackBar: MatSnackBar,
		@Inject(PLATFORM_ID) private platformId: object
	) {
		this.isBrowser = isPlatformBrowser(this.platformId);
	}

	showSnackBar(message: string): void {
		if (this.isBrowser) {
			this._snackBar.open(message, '', {
				duration: 3000,
				horizontalPosition: 'right',
				verticalPosition: 'top',
			});
		}
	}

	closeSnackBar(): void {
		if (this.isBrowser) {
			this._snackBar.dismiss();
		}
	}
}
