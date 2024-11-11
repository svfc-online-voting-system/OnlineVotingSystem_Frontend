import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '@app/core/models/interface/dialog.interface';
import { Observable } from 'rxjs';
import { DialogBoxComponent } from '@app/shared/ui/dialog-box/dialog-box.component';

@Injectable({
	providedIn: 'any',
})
export class DialogService {
	constructor(private dialog: MatDialog) {}

	openConfirmationDialog(data: DialogData): Observable<boolean> {
		const dialogRef = this.dialog.open(DialogBoxComponent, {
			width: '400px',
			data: {
				title: data.title,
				message: data.message,
				confirmText: data.confirmText,
				cancelText: data.cancelText,
				showCancel: data.showCancel ?? true,
				isHTML: data.isHTML ?? false,
			},
		});

		return dialogRef.afterClosed();
	}
}
