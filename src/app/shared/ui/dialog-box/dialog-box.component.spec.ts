import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogBoxComponent } from './dialog-box.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '@app/core/models/interface/dialog.interface';

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
			imports: [DialogBoxComponent],
			providers: [{ provide: MAT_DIALOG_DATA, useValue: mockDialogData }],
		}).compileComponents();

		fixture = TestBed.createComponent(DialogBoxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display title from data', () => {
		const titleElement = fixture.nativeElement.querySelector('h2');
		expect(titleElement.textContent).toContain(mockDialogData.title);
	});

	it('should display message as plain text when isHTML is false', () => {
		const messageElement = fixture.nativeElement.querySelector('p');
		expect(messageElement.textContent).toContain(mockDialogData.message);
	});
});
