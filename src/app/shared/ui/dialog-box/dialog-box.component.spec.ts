import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogBoxComponent } from './dialog-box.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogData } from '@app/core/models/interface/dialog.interface';
import { SafeHtmlPipe } from '@app/core/pipes/safe-html.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogBoxComponent', () => {
	let component: DialogBoxComponent;
	let fixture: ComponentFixture<DialogBoxComponent>;

	const mockDialogData: DialogData = {
		title: 'Test Title',
		message: 'Test Message',
		confirmText: 'OK',
		cancelText: 'Cancel',
		showCancel: true,
		isHTML: false,
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				DialogBoxComponent,
				MatDialogModule,
				MatButtonModule,
				BrowserAnimationsModule,
				SafeHtmlPipe,
			],
			providers: [{ provide: MAT_DIALOG_DATA, useValue: mockDialogData }],
		}).compileComponents();

		fixture = TestBed.createComponent(DialogBoxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should display HTML message when isHTML is true', async () => {
		const htmlData = {
			...mockDialogData,
			isHTML: true,
			message: '<p>HTML Message</p>',
		};

		component.data = htmlData;
		fixture.detectChanges();
		await fixture.whenStable();

		const messageElement =
			fixture.nativeElement.querySelector('div[innerHTML]');
		expect(messageElement).toBeTruthy();
		expect(messageElement.innerHTML).toContain('HTML Message');
	});
});
