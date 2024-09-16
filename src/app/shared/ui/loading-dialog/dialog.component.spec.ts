import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
	let component: DialogComponent;
	let fixture: ComponentFixture<DialogComponent>;
	let mockDialogRef: jasmine.SpyObj<MatDialogRef<DialogComponent>>;

	beforeEach(async () => {
		// Create a mock instance of MatDialogRef
		mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

		await TestBed.configureTestingModule({
			imports: [MatDialogModule, DialogComponent],
			declarations: [],
			providers: [{ provide: MatDialogRef, useValue: mockDialogRef }],
		}).compileComponents();

		fixture = TestBed.createComponent(DialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
