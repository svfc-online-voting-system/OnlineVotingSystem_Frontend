import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DialogData } from '@app/core/models/interface/dialog.interface';
import { SafeHtmlPipe } from '@app/core/pipes/safe-html.pipe';

@Component({
	selector: 'app-dialog-box',
	standalone: true,
	imports: [MatDialogModule, MatButtonModule, NgIf, SafeHtmlPipe],
	templateUrl: './dialog-box.component.html',
	styleUrl: './dialog-box.component.scss',
})
export class DialogBoxComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
