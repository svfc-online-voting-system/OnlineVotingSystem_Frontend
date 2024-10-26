import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AddNewVoteSheetComponent } from './add-new-vote-sheet.component';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

describe('AddNewVoteSheetComponent', () => {
	let component: AddNewVoteSheetComponent;
	let fixture: ComponentFixture<AddNewVoteSheetComponent>;
	let mockBottomSheetRef: jasmine.SpyObj<MatBottomSheetRef<AddNewVoteSheetComponent>>;

	beforeEach(async () => {
		mockBottomSheetRef = jasmine.createSpyObj('MatBottomSheetRef', ['dismiss']);

		await TestBed.configureTestingModule({
			imports: [AddNewVoteSheetComponent],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: {
							paramMap: {
								get: () => 'mockId',
							},
						},
						params: of({ id: 'mockId' }),
					},
				},
				{ provide: MatBottomSheetRef, useValue: mockBottomSheetRef },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(AddNewVoteSheetComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should dismiss the bottom sheet on openBottomSheet call', () => {
		const event = new MouseEvent('click');
		spyOn(event, 'preventDefault');
		component.openBottomSheet(event);
		expect(mockBottomSheetRef.dismiss).toHaveBeenCalled();
		expect(event.preventDefault).toHaveBeenCalled();
	});

	it('should have a defined bottom sheet reference', () => {
		expect(component['_bottomSheetRef']).toBeDefined();
	});
});
